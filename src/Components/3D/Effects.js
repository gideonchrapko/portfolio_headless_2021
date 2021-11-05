import React from 'react';
import { EffectComposer, Bloom, SSAO } from '@react-three/postprocessing';
 
function Effects() {
  return (
    <EffectComposer multisampling={8}>
      {/* <SSAO  intensity={15} radius={10} luminanceInfluence={0} bias={0.035} /> */}
      <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.2} />
    </EffectComposer>
  )
}

export default Effects