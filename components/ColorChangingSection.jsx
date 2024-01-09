import React, { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styled from "styled-components";

gsap.registerPlugin(ScrollTrigger);

export default function ColorChangingSection({ beforeColor, bgColor, text }) {
  const bgRef = React.useRef(null);

  useEffect(() => {
    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top 50%",
        end: "bottom 50%",
        scrub: true,
        onEnterBack: () => {
          document.body.style.backgroundColor = beforeColor;
        }
      },
      ease: "power1.inOut",
      scaleX: 2,
      scaleY: 4,
      onComplete: () => {
        document.body.style.backgroundColor = bgColor;
      },
    });
  }, [bgRef.current]);

  return (
    <div className="my-20">
      <div className="relative grid place-items-center h-96">
        <Background 
          style={{backgroundColor: bgColor}}
          ref={bgRef}
        />
        <Text
          className="absolute inset-0 w-80"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
}

const Background = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 1000px;
  border-radius: 32px;
  height: 100%;
`

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 1000px;
`
