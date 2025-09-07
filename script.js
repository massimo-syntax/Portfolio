
gsap.registerPlugin(ScrollToPlugin)

document.addEventListener("DOMContentLoaded", (event) => {
  
	//    FRAMEWORK
	const d = (element_query_selector) => document.querySelector(element_query_selector)
	const dl = (element_query_selector) => document.querySelectorAll(element_query_selector)
	const log = (what) => {console.log(what)}
	 
	//    nabar width for scrolling on nav click
	const nav = d("nav")
	const navbarHeight = nav.offsetHeight


	// split text stagger animatino
	const myText = new SplitType("#website_title > h2");
	gsap.to("#website_title > h2 .char", {
		opacity:1,
		//stagger: 0.1,
		delay: 0.1,
		duration: 0.5,
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

	// SCROLL ON CLICK
	
	// navbar buttons
	document.querySelectorAll("nav button.scroll-to").forEach((btn, index) => {
	    btn.addEventListener("click", () => {
	      gsap.to(window, {duration: 1, scrollTo:{y:"#"+sections[index].id, offsetY: navbarHeight - 1}});
	    });
	  });

	// cards buttons 1st section
	d("#btn-card__1").addEventListener("click",()=>{
		gsap.to(window, {duration: 1, scrollTo:{ y:"#gallery_1" , offsetY: navbarHeight }});
	})
	d("#btn-card__2").addEventListener("click",()=>{
		gsap.to(window, {duration: 1, scrollTo:{ y:"#gallery_2" , offsetY: navbarHeight }});
	})


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
		scroll = window.scrollY + navbarHeight; 

		if( time > timeLast ){ // not needed anymore, most of the times scrolling on btn click is not updated the location with +200
			// cheeck wich section 
			for(let i = 0 ; i < sections.length ; i++ ){
				if(scroll >= tops[i] && scroll < tops[i]+heights[i]){
					// knowing the section know how many px is scrolled, in this section
					inscroll = scroll - tops[i]
					// lastBtn = btns[i]
					// i is the number of the section, also of the button sect1 = btn1
					// instead to loop throught all the buttons just keep track of which,
					// to then change back the style as it was when highliting the new one
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


	// write text typing mimic
	function typetext(id){
		d("#header_subtitile").style.visibility = "visible"		
		const myText = new SplitType("#header_subtitile");
		gsap.from("#header_subtitile .char", {
			opacity:0,
			stagger: 0.05,
			delay: 1.5,
			duration: 0.01,
			ease:"fade.out",

		});
	}
	typetext("#header_subtitile")


	// GSAP OVERLAP PICTURES
	gsap.registerPlugin(ScrollTrigger) 
	
	gsap.set("#gallery_1 .photo_showcase:not(:first-child)", {opacity:0.7, scale:0, y:"100%"})
	const animation_1 = gsap.to(" #gallery_1 .photo_showcase:not(:first-child)", {
		y:"0%", opacity:1, scale:1, duration:1, stagger:1
	})

	ScrollTrigger.create({
		trigger:"#gallery_1",
		start:"top top",
		end:"bottom bottom",
		pin:"#showcase_pictures_container_1",
		animation: animation_1,
		scrub:true,
		//markers:true
	})

	gsap.set("#gallery_2 .photo_showcase:not(:first-child)", {opacity:0.7, scale:0, y:"100%"})
	const animation_2 = gsap.to(" #gallery_2 .photo_showcase:not(:first-child)", {
		y:"0%", opacity:1, scale:1, duration:1, stagger:1
	})

	ScrollTrigger.create({
		trigger:"#gallery_2",
		start:"top top",
		end:"bottom bottom",
		pin:"#showcase_pictures_container_2",
		animation: animation_2,
		scrub:true,
		//markers:true
	})






}); // dom content loaded



