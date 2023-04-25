const getStep = (path) => /step-(\d)\.html$/.exec(path)?.[1] || "1"
const fromStep = getStep(document.referrer)
const toStep = getStep(location.href)

document.documentElement.style.setProperty("--from-step", fromStep)
document.documentElement.style.setProperty("--step", toStep)
