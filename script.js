
gsap.registerPlugin(ScrollToPlugin)

document.addEventListener("DOMContentLoaded", (event) => {
  
	//    FRAMEWORK
	const d = (element_query_selector) => document.querySelector(element_query_selector)
	const dl = (element_query_selector) => document.querySelectorAll(element_query_selector)
	const log = (what) => {console.log(what)}
	 
	//    nabar width for scrolling on nav click
	const nav = d("nav")
	const navbarHeight = nav.offsetHeight


	document.querySelectorAll("nav button.scroll-to").forEach((btn, index) => {
	    btn.addEventListener("click", () => {
	      gsap.to(window, {duration: 1, scrollTo:{y:"#section" + (index + 1), offsetY: navbarHeight }});
	    });
	  });


	// split text stagger animatino
	const myText = new SplitType("#website_title > h2");
	gsap.to("#website_title > h2 .char", {
		opacity:1,
		//stagger: 0.1,
		delay: 0.2,
		duration: 1,
		ease:"fade.out",
		stagger:{
			each:0.1,
			from: "random"		
		}
	});

	gsap.to('.box-reveal', {
	  duration: 1,
	  opacity:1,
	  x: 0,
	  //transformOrigin: "50% 50%",
	  //rotateY: 360,
	  ease: "back.out(1.7)",
	  stagger: 0.3,
	});
	
	gsap.to('nav > #scrollbar', {
	  duration: 1,
	  opacity:1,
	  y:0,
	  //rotateY: 1440,
	  ease: "ease.out"
	});


	let timeLast = Date.now()
	let time = timeLast

	const sections = dl(".vanillaJsScroll")
	const heights = []
	const tops = []
	sections.forEach(s => { 
		heights.push(s.offsetTop+s.offsetHeight - s.offsetTop)  
		tops.push(s.offsetTop)
	})

	heights.forEach( (h, index) => {log(h); log(tops[index]) } )

	const count = sections.length

	let scroll = 0

	const btns = dl("button.scroll-to")
	let lastBtn = btns[btns.length-1]
	const _i_color = lastBtn.style.color
	const prettyColor = "#146ef5"

	const _scrollbar = d("#scrollbar")
	scrollbar.style.left = btns[0].offsetLeft + "px"
	
	//scrollbar.style.bottom = "1px"//btns[0].offsetTop + btns[0].offsetHeight + "px"

	let farFromTopRatio = 0.00
	let pxFromRatio = 0
	let inscroll = 0

	const documentBottom = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

	window.addEventListener("scroll", (event) => {
		// the browser can rest some milliseconds before next calculation
		time = Date.now()
		// top window + navbar does not directly overlap tops[i]
		scroll = window.scrollY + navbarHeight + 30; 

		if( time > timeLast + 200 ){
			for(i = 0 ; i < sections.length ; i++ ){

				if(scroll > tops[i] && scroll < tops[i]+heights[i]){
					inscroll = scroll - tops[i]
					//	lastBtn = btns[i]
					if(btns[i] !== lastBtn){
						btns[i].style.color = prettyColor
						lastBtn.style.color = _i_color
						lastBtn.blur()
						lastBtn = btns[i]

					}
					farFromTopRatio = inscroll / heights[i]
					log("inscroll ratio [" + i + "]" + farFromTopRatio )
					pxFromRatio = btns[i].offsetLeft + (btns[i].offsetWidth * farFromTopRatio ) 
					_scrollbar.style.left =  ( pxFromRatio - scrollbar.offsetWidth / 2 ) + "px"
				} 
			}
			timeLast = time
		}
		if(scroll < navbarHeight + 50) scrollbar.style.left = btns[0].offsetLeft + "px"
		if( (scroll - navbarHeight + window.innerHeight) > documentBottom - 50 ) scrollbar.style.left = btns[btns.length-1].offsetLeft + btns[btns.length-1].offsetWidth - scrollbar.offsetWidth + "px"
  	});


}); // dom content loaded



