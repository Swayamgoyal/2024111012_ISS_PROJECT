// Position skill nodes evenly around each orbit
document.querySelectorAll('.orbit').forEach(orbit => {
    const nodes = orbit.querySelectorAll('.skill-node');
    const r = orbit.offsetWidth / 2;
    nodes.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / nodes.length;
      node.style.left = `${50 + 50 * Math.cos(angle)}%`;
      node.style.top = `${50 + 50 * Math.sin(angle)}%`;
      node.style.transform = 'translate(-50%, -50%)';
    });
  });
  
  // Tooltip logic
  const tooltip = document.getElementById('skillTooltip');
  document.querySelectorAll('.skill-node').forEach(node => {
    node.addEventListener('mouseenter', e => {
      tooltip.innerHTML = `<strong>${node.dataset.skill}</strong><br><span>${node.dataset.desc}</span>`;
      tooltip.style.opacity = 1;
    });
    node.addEventListener('mousemove', e => {
      tooltip.style.left = (e.pageX + 20) + 'px';
      tooltip.style.top = (e.pageY - 10) + 'px';
    });
    node.addEventListener('mouseleave', () => {
      tooltip.style.opacity = 0;
    });
  });
  