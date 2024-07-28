import React from "react";

const SignUpStageIndicator = ({
  stage,
  outOf,
}: {
  stage: number;
  outOf: number;
}) => {
  return (
    <div className="flex w-full flex-row space-x-2">
      {Array.from({ length: stage }, (_, index) => (
        <div
          key={index}
          className="flex flex-grow rounded-full bg-primary py-1"
        />
      ))}
      {Array.from({ length: outOf - stage }, (_, index) => (
        <div
          key={index}
          className="flex flex-grow rounded-full bg-gray-200 py-1"
        />
      ))}
    </div>
  );
};

export default SignUpStageIndicator;
