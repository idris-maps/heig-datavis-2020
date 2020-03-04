const fs = require('fs')
const { promisify } = require('util')
const { exec } = require('child_process')

const DIR = 'examples_site'
const BUILDS = [
  'npm run build:recette:d3',
  'npm run build:recette:billboard',
  'npm run build:recette:chartjs',
]
const FOLDERS = [
  '20200221/exemples_svg_web',
  'recettes/d3/dist',
  'recettes/billboard/dist',
  'recettes/chartjs/dist',
]

const readdir = promisify(fs.readdir)

const run = cmd => new Promise((resolve, reject) =>
  exec(cmd, (err, stdout, stderr) => {
    console.log(`CMD: ${cmd}`)
    if (err) { return reject(err) }
    if (stdout) { console.log(`STDOUT: ${stdout}`) }
    if (stderr) { console.log(`STDERR: ${stderr}`) }
    return resolve()
  }))

const loop = async (index, items, func) => {
  if (index === items.length) { return }
  await func(items[index])
  await loop(index + 1, items, func)
}

const copyFolder = async dir => {
  const files = await readdir(dir)
  const foldersToCreate = dir.split('/').map((d, i, a) => {
    const prev = Array.from(Array(i)).map((d, i) => a[i])
    return [...prev, d].join('/')
  })
  await loop(0, foldersToCreate, d => run(`mkdir -p ${DIR}/${d}`))
  const data = files.map(d => ({
    input: `${dir}/${d}`,
    output: `${DIR}/${dir}/${d}`,
    name: d.split('.')[0],
  }))
  await Promise.all(data.map(({ input, output }) => run(`cp ${input} ${output}`)))
}

const indexFile = `
<html>
  <meta http-equiv=\"Refresh\" content=\"0; url=https://github.com/idris-maps/heig-datavis-2020\" />
</html>
`

const publish = async () => {
  await Promise.all(BUILDS.map(run))
  await run(`rm -rf ${DIR}`)
  await run(`mkdir ${DIR}`)
  await run(`echo \'${indexFile}\' > ${DIR}/index.html`)
  await loop(0, FOLDERS, copyFolder)
  await run(`npx surge ${DIR} http://heig-datavis2020.surge.sh`)
}

publish()