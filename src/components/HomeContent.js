import React, { useEffect, useState } from 'react'
import TextLoop from 'react-text-loop'


function Page1 ({ warp }) {
  const [delay1, setDelay1] = useState(false)
  const [delay2, setDelay2] = useState(false)

  useEffect(() => {
    setTimeout(() => setDelay1(true), 1000)
    setTimeout(() => setDelay2(true), 3000)
  }, [])



  return (
    <section className='page page-1'>
      <TextLoop
        delay={1000}
        interval={5000}
        noWrap={false}
        className={`main-text ${delay1 && 'show'}`}
      >
        <h1>
          I watched that online course and got an amazing job offer!
        </h1>
        <h1>
          I read this great tutorial and could build my SaaS from scratch!
        </h1>
      </TextLoop>
      <h2 className={`subtitle-text ${delay2 && 'show'}`}>
        * (said no one ever)
      </h2>
    </section>
  )
}


function Page2 (){
  return (
    <section className='page page-2'>
      <p><strong>Becoming a self-taught developer is hard AF!</strong></p>
      <p>Doing this without proper guidance is even harder!</p>
      <p>Have you gone through the <strong>tutorial loop hell?</strong></p>
      <p>Online courses, or even a bootcamp <strong>but still can’t put together an app by yourself?</strong></p>
      <p><strong>Gave up multiple times</strong> feeling like your brain just isn’t built for this?</p>
      <p>Copy-pasted a bunch of code from StackOverflow, but don’t fully understand it, and how to debug it?</p>
      <p>Let alone, explain it under pressure in a job interview?</p>
      <p>Do you want to stop wasting time?</p>
      <p>Get that job or lunch your dream product?</p>
      <h3>Do you want to finally learn the right way?</h3>
    </section>
  )
}


function Page3 (){
  return (
    <section className='page page-3'>
      <h3>The biggest code challenges<br/> have nothing to do with code</h3>
      <p><strong>They are deep internal struggles:</strong></p>
      <ul>
        <li><strong>Procrastinating</strong> and unable to keep the habit of learning.</li>
        <li>Unable to write code by yourself from scratch. <strong>Bought 3 different Udemy courses and still couldn’t write that app that YOU wanted?</strong></li>
        <li>Not having somebody to consult with when you are stuck, or to keep you accountable.</li>
        <li>Feeling stressed, stupid or incapable.</li>
        <li>Having the <strong>“imposter syndrome”</strong>.</li>
        <li>Not knowing if the tech choices you are making are the right ones, leading to paralysis (also known as “decision fatigue”).</li>
        <li><strong>Giving up</strong> when not knowing where to look for solutions.</li>
      </ul>
    </section>
  )
}


function Page4 (){
  return (
    <section className='page page-4'>
      <h4>If this feels painfully familiar you should know that you are NOT ALONE!</h4>
      <p><strong>You are NOT lazy, stupid or incapable!</strong></p>
      <p>And there is nothing wrong with your brain.</p>
      <p>This is not your fault and you can overcome this!</p>
      <p>Learning is a natural ability that we have from the moment we are born.</p>
      <p>All it requires is curiosity and passion. The rest just follows.</p>
      <p>The fault is with our educations system and work environment.</p>
      <p><strong>For most of us, learning has been a traumatic experience</strong></p>
      <p>Today’s schools make sure that every ounce of joy coming from natural curiosity is sucked dry out of us by the time we graduate.</p>
      <p>Being shamed by teachers or even parents for not being able to learn properly, when they are the ones that should be helping us to.</p>
      <p>This is how we start to expect completely unrealistic things from ourselves.</p>
      <p>Instead of playing and exploring, we worry and think that we are incapable.<br/><br/></p>
      <h4>So how do you gain back your confidence?</h4>
      <p>Confidence is an often misunderstood concept.</p>
      <p>People believe that you first develop an inner feeling and then you succeed at what you do. The truth is that it works the other way around:</p>
      <p><strong>You first make a leap of faith. Take the first step before feeling ready, not without fear but despite the fear</strong></p>
      <p>You try and fail and try and fail again until you make small steps of success.</p>
      <p>Those steps are the seeds of confidence.</p>
      <p>However, the challenge must be real.</p>
      <p>Your mind and body must know without a doubt that you didn’t take a shortcut. That the coach didn’t go easy on you just to make you feel good about yourself.</p>
      <p>If you go to the gym and lift weights, you know that either you can lift X pounds or you cannot. When you have lifted a 100-pound weight, you have no doubt in your mind that you can lift 100 pounds.</p>
      <p><strong>This is confidence.</strong></p>
    </section>
  )
}


function Page5 ({ clickAction }){
  return (
    <section className='page page-5'>
      <h4>Well, that was a wall of text...</h4>
      <h3>What would you like<br/>to do now?</h3>
      <div className="buttons">
        <a className='signup' href='https://buy.stripe.com/bIY2aM2dr8vTfGo6ou'>
          I WANT THIS<br/>Take my money and sign me up!
        </a>
        <a href='https://calendly.com/ilya-dorman/student-consultation' className='call'>
          I want to talk to a human<br/>(that would be me)
        </a>
      </div>
      <div className="buttons">
        <a
          className='read'
          onClick={clickAction}
        >
          I want to read more about the program
        </a>
        <a
          href='https://9gag.com/tag/crocodile'
          target='_blank'
          className='cats'
        >
          I'd rather just see some crocodile memes
        </a>
      </div>
    </section>
  )
}


export const pages = [
  {
    name: 'page-1',
    component: <Page1/>
  },{
    name: 'page-2',
    component: <Page2/>
  },{
    name: 'page-3',
    component: <Page3/>
  },{
    name: 'page-4',
    component: <Page4/>
  },{
    name: 'page-5',
    component: <Page5/>
  },
]
