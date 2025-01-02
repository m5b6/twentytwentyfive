// Script to generate favicon
const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const ctx = canvas.getContext('2d');

// Set background
ctx.fillStyle = '#111111';
ctx.fillRect(0, 0, 32, 32);

// Draw emoji
ctx.font = '24px serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('✨', 16, 16);

// Convert to .ico format
const link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = canvas.toDataURL("image/x-icon");
document.getElementsByTagName('head')[0].appendChild(link); 