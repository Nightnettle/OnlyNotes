"use client";
import React from 'react';
import Typewriter from 'typewriter-effect';

type Props = {}

const phrases = [
  "⚡ Improve Productivity.",
  "✒️ Write quality notes with AI.",
  "\uD83D\uDCA1Gain inspiration for notes."
];

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
        options={{
            loop: true
        }}
        onInit={(typewriter) => {
            phrases.forEach((text) => {
              typewriter.typeString(text)
              .pauseFor(1000)
              .deleteAll()
            })
            typewriter.start();
        }}
    />
  )
}

export default TypewriterTitle