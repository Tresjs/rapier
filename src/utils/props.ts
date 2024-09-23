import { watch } from 'vue'

export const makePropWatcherRB = (
  props: any,
  toWatch: string,
  instance: any,
  onSet: string,
) => watch([() => props[toWatch], instance], ([newValue, _]) => {
  if (!instance.value) { return }
  instance.value[onSet](newValue, true)
})

export const makePropsWatcherRB = (
  props: any,
  watchers: string[],
  instance: any,
) => watchers.forEach((watcher) => {
  // Uppercase only for the first letter in the watcher
  const watcherName = watcher.charAt(0).toUpperCase() + watcher.slice(1)
  makePropWatcherRB(props, watcher, instance, `set${watcherName}`)
})
