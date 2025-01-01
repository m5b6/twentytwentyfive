export function initSpinAnimation() {
  const spinElements = document.querySelectorAll('.spin');
  
  spinElements.forEach(element => {
    let rotation = 0;
    let animationFrameId;
    
    function updateSpin() {
      rotation = (rotation + 2) % 360;
      element.style.transform = `rotate(${rotation}deg)`;
      animationFrameId = requestAnimationFrame(updateSpin);
    }
    
    // Start spinning
    updateSpin();
    
    element.addEventListener('mouseenter', () => {
      // Stop the continuous spin
      cancelAnimationFrame(animationFrameId);
      
      // Animate to 0 degrees
      const currentRotation = rotation;
      const startTime = performance.now();
      const duration = 100; // 300ms
      
      function smoothRotateToZero(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentDegrees = currentRotation + (0 - currentRotation) * easeProgress;
        element.style.transform = `rotate(${currentDegrees}deg) scale(1.2)`;
        
        if (progress < 1) {
          requestAnimationFrame(smoothRotateToZero);
        }
      }
      
      requestAnimationFrame(smoothRotateToZero);
    });
    
    element.addEventListener('mouseleave', () => {
      // Reset scale and restart continuous spin
      element.style.transform = `rotate(${rotation}deg)`;
      updateSpin();
    });
  });
} 