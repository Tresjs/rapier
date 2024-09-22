import { watch } from 'vue'

export const makePropWatcher = (
  props: any,
  toWatch: string,
  instance: any,
  onSet: string,
) => watch(() => props[toWatch], (newValue) => {
  if (!instance.value) { return }
  instance.value[onSet](newValue, true)
}, { immediate: true })

export const makePropsWatcher = (
  props: any,
  watchers: string[],
  instance: any,
) => watchers.forEach((watcher) => {
  // Uppercase only for the first letter in the watcher
  const watcherName = watcher.charAt(0).toUpperCase() + watcher.slice(1)
  makePropWatcher(props, watcher, instance, `set${watcherName}`)
})
