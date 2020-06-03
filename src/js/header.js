(function(){
	const q = s => document.querySelector(s);
	const dropdown = q('.dropdown'),
		close = q('.close-dropdown'),
		open = q('.open-dropdown');
	function addAnime(svg, target, to){
		let from = svg.querySelector('polygon').getAttribute('points');
		let animation;
		const createAnime = newValue => {
			if (animation) return animation.reverse();
			animation = anime({
				targets: svg.querySelector('polygon'),
				points: [{value: newValue}],
				easing: 'linear',
				duration: 100,
				complete: ()=>{
					animation = null;
				}
			})
		}
		target.addEventListener('mouseenter', ()=>createAnime(to));
		target.addEventListener('mouseleave', ()=>createAnime(from));
	}
	Array.from(document.querySelectorAll('.nav-btn-container svg')).forEach(svg => {
		addAnime(svg, svg.parentNode.querySelector('.btn') ,'0,0 0,0 180,0 180,60 180,60 0,60');
	});
	close.addEventListener('click', () => dropdown.toggleAttribute('show'));
	open.addEventListener('click', () => dropdown.toggleAttribute('show'));
}());