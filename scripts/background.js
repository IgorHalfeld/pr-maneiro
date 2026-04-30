/* eslint-disable */
chrome.runtime.onInstalled.addListener(async function () {
  await chrome.declarativeContent.onPageChanged.removeRules(undefined)

  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'github.com' },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    },
  ])
})
