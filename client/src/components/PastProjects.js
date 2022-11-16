import React, { useState } from "react";
import Tweet from "./Tweet";
import MentionProjects from "./MentionProjects";

const OtherProjects = ({
  currentUser,
  userProjectsForMention,
  userProjectsForRaid,
}) => {
  return (
    <>
      {currentUser &&
        userProjectsForMention?.map((data) => (
          <>
            <MentionProjects
              currentUsers={currentUser}
              datas={data}
              mention={true}
            />
          </>
        ))}

      {currentUser &&
        userProjectsForRaid.map((data) => (
          <>
            <Tweet
              currentUser={currentUser}
              data={data.tweet}
              projectDetail={data.projectDetail}
              poolData={{
                splToken: data?.pool?.splToken,
                startTime: data?.pool?.startTime,
                endTime: data?.pool?.endTime,
                rewardCategory: data?.pool?.rewardCategory,
              }}
            />
          </>
        ))}
    </>
  );
};
export default OtherProjects;
