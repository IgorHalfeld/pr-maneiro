(async () => {
  const app = await BuildApp({ window, document }) // eslint-disable-line
  app.andRun()
})()
