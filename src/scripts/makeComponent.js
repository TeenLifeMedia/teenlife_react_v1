const commander = require('commander')
const { exec } = require('child_process')

commander
  .option('-d, --dir [dir]', 'Directory where the component lives', 'components')
  .option('-i, --index [index]', 'Name of component index file', 'index.js')
  .option('-s, --styles [styles]', 'Name of styles file', 'styles.css')
  .option('-t, --test [test]', 'Name of test file', 'test.js')
  .action((component, { dir, index, styles, test }) => {
    const dirPath = `${__dirname}/../${dir}`
    const componentPath = `${dirPath}/${component}`
    const indexPath = `${componentPath}/${index}`
    const stylesPath = `${componentPath}/${styles}`
    const testPath = `${componentPath}/${test}`

    const pathsAndContent = [
      {
        path: indexPath,
        content: `import React from \'react\'\nimport styles from \'./styles.css\'\n\nconst ${component} = (props) => {\n  return <div/>\n}\n\nexport default ${component}`,
      },
      {
        path: stylesPath,
        content: '',
      },
      {
        path: testPath,
        content: `import React from 'react'\nimport { render, cleanup } from '@testing-library/react'\n\nimport ${component} from '.'`,
      },
    ]
    exec(`mkdir ${dirPath}`)
    exec(`mkdir ${componentPath}`)

    pathsAndContent.forEach(({ path, content }) => {
      exec(`touch ${path}`)
      exec(`echo "${content}" >> ${path}`)
    })
  })

commander.parse(process.argv)
