import { DirectionalLight, SpotLight, PointLight } from 'three'

export const addLight = () => {
	let light = new DirectionalLight(0xffffff, 1)
	light.position.set(0,0, 1)
	return light
}

export const addLight1 = () => {
	let light = new DirectionalLight(0xF9F4F9, 3)
	light.position.set(8,0, 2)
	return light
}

export const addLight2 = () => {
	let light = new DirectionalLight(0xF9F4F9, 3)
	light.position.set(-8,0, 2)
	return light
}

export const addLightback = () => {
	let light = new PointLight(0xF9F4F9,1,10)
	light.position.set(0,10, -4)
	return light
}

