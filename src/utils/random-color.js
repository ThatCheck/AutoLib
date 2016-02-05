export default function randomColor() {
  const color = ['red-bg', 'yellow-bg', 'blue-bg', 'navy-bg'];
  return color[Math.floor(Math.random() * color.length)];
}
