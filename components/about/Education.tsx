import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

export function Education() {
  return (
    <Terminal>
      <TypingAnimation>&gt; npm get academic history</TypingAnimation>

      <AnimatedSpan delay={1500} className="text-emerald-500">
        <span>✔ JSC </span>
      </AnimatedSpan>

      <AnimatedSpan delay={2500} className="">
        <span>
          ℹ GPA 5.00
        </span>
        <span className="pl-2">- R. B. Govt High School, Joypurhat</span>
        <span className="pl-2 text-muted-foreground">- 2015</span>
      </AnimatedSpan>

      <AnimatedSpan delay={1500} className="text-emerald-500">
        <span>✔ SSC (Science)</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2500} className="">
        <span>ℹ GPA 5.00</span>
        <span className="pl-2">- R. B. Govt High School, Joypurhat</span>
        <span className="pl-2 text-muted-foreground">- 2018</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3000} className="text-emerald-500">
        <span>✔ HSC (Science)</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3500} className="">
        <span>ℹ GPA 4.83</span>
        <span className="pl-2">- Joyputhat Govt. College</span>
        <span className="pl-2 text-muted-foreground">- 2020</span>
      </AnimatedSpan>

      <AnimatedSpan delay={4000} className="text-rose-500">
        <span>x B.Sc. in CSE</span>
      </AnimatedSpan>

      <AnimatedSpan delay={4500} className="">
        <span>
          ℹ CGPA 3.5 <span className="text-yellow-500/70">Ongoing</span>
        </span>
        <span className="pl-2">- Daffodil International University</span>
        <span className="pl-2 text-muted-foreground">- 2021-2025</span>
      </AnimatedSpan>
    </Terminal>
  );
}
