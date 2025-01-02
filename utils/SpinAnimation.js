export function initSpinAnimation() {
  const spinElements = document.querySelectorAll('.spin');
  
  spinElements.forEach(element => {
    let rotation = 0;
    let animationFrameId;
    
    function updateSpin() {
      rotation += 2;  // Remove the modulo, let it grow continuously
      element.style.transform = `rotate(${rotation}deg)`;
      animationFrameId = requestAnimationFrame(updateSpin);
    }
    
    // Start spinning
    updateSpin();
    
    element.addEventListener('mouseenter', () => {
      // Stop the continuous spin
      cancelAnimationFrame(animationFrameId);
      
      // Animate to nearest 360 multiple
      const targetRotation = Math.ceil(rotation / 360) * 360;
      const startTime = performance.now();
      const duration = 100;
      
      function smoothRotateToTarget(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentDegrees = rotation + (targetRotation - rotation) * easeProgress;
        element.style.transform = `rotate(${currentDegrees}deg) scale(1.2)`;
        
        if (progress < 1) {
          requestAnimationFrame(smoothRotateToTarget);
        } else {
          rotation = targetRotation;  // Update the rotation to match where we ended
        }
      }
      
      requestAnimationFrame(smoothRotateToTarget);
    });
    
    element.addEventListener('mouseleave', () => {
      // Reset scale and restart continuous spin from current rotation
      element.style.transform = `rotate(${rotation}deg)`;
      updateSpin();
    });
  });
} 