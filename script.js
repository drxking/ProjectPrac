function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true,
        lerp: 0.15,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

loco()

let tl = gsap.timeline();

tl.from(".name", {
    y: `150%`,
    duration: 1.3,
    delay: 0.3,
    ease: Expo.easeOut,
});
tl.to(
    ".front",
    {
        top: `-100%`,
        delay: 0.5,
        duration: 0.6,
    },
    "a"
);
tl.to(
    ".name",
    {
        y: `-200%`,
        duration: 0.5,
        ease: Expo.easeIn,
    },
    "a"
);
tl.from(
    "nav",
    {
        y: `-100%`,
        scale:0.9,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
    },
    "a"
);
tl.from(
    ".h1-wrapper h1",
    {
        y: `100%`,
        rotate: `15deg`,
        duration: 1,
        delay: 0.5,
        stagger: 0.1,
    },
    "a"
);

let trigger = gsap.timeline({
    scrollTrigger: {
        scroller: "main",
        trigger: ".wrapper-2",
        start: "top bottom",
    },
});

trigger.from(
    ".h1-wrapper-2 h1",
    {
        y: `100%`,
        rotate: `10deg`,
        stagger: 0.1,
        delay: 0.3,
        duration: 0.9,
    },
    "same"
);
trigger.from(
    ".image img",
    {
        scale: 1.7,
        duration: `0.9`,
    },
    "same"
);

document.querySelectorAll(".bar").forEach((bar) => {
    gsap.from(bar, {
        width: 0,
        scrollTrigger: {
            scroller: "main",
            trigger: bar,
            start: "top 90%",
        },
    });
});

document.querySelectorAll(".cont").forEach((cont) => {
    gsap.from(cont, {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            scroller: "main",
            trigger: cont,
            start: "top 90%",
        },
    });
});








gsap.from(".h1-wrapper-3 h1", {
    y: `150%`,
    rotate: `-3deg`,
    stagger: 0.09,
    scrollTrigger: {
        trigger: ".works",
        scroller: "main",
        start: "top 90%",
    },
});

