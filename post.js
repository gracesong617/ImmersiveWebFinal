import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass'

export function post(scene,camera,renderer){
    const composer = new EffectComposer(renderer)
    composer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    composer.setSize(window.innerWidth, window.innerHeight)

    const renderPass = new RenderPass(scene,camera)
    composer.addPass(renderPass)

    const pixelPass = new RenderPixelatedPass(6,scene,camera)
    // pixelPass.pixerSize = 6
    pixelPass.normalEdgeStrength = 2
    composer.addPass(pixelPass)


    const outputPass = new OutputPass()
    composer.addPass(outputPass)

    const glitchPass = new GlitchPass()
    glitchPass.enabled = false
    composer.addPass(glitchPass)

    const bloomPass = new UnrealBloomPass()
    bloomPass.strength = 1.3
    // bloomPass.radius = 3
    // bloomPass.threshold = 0.3
    composer.addPass(bloomPass)

    const AfterImagePass = new AfterimagePass()
    AfterImagePass.uniforms.damp.value = 0.96
    composer.addPass(AfterImagePass)



    return{composer:composer, after:AfterImagePass, bloom:bloomPass}
}