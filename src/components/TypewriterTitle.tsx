"use client";
import React from 'react';
import Typewriter from 'typewriter-effect';

type Props = {}

const phrases = [
  "⚡ Work smarter not harder.",
  "✒️ AI assistant for note-taking.",
  "✨ Stay inspired."
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