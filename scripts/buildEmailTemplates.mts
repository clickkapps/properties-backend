// scripts/buildEmailTemplates.mts
import path from 'path'

// Dynamically import Maizzle and configs
const maizzleModule = await import('@maizzle/framework')
const maizzleConfigModule = await import(path.resolve('maizzle.config.js'))
const tailwindConfigModule = await import(path.resolve('tailwind.config.js'))

// Grab actual values from default exports
const maizzle = maizzleModule.default
const maizzleConfig = maizzleConfigModule.default
const tailwindConfig = tailwindConfigModule.default

if (typeof maizzle !== 'function') {
    throw new Error('Maizzle default export is not a function')
}

await maizzle(maizzleConfig, {
    env: 'production',
    tailwind: tailwindConfig,
})

console.log('[Email] Templates compiled.')
