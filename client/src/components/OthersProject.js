import React, { useState } from "react";
import Tweet from "./Tweet";
import MentionProjects from "./MentionProjects";

const OtherProjects = ({
  currentUser,
  userNotIncludeProjectsForMention,
  userNotIncludeProjectsForRaid,

  // props, data
}) => {
  return (
    <>
     {currentUser &&
        userNotIncludeProjectsForRaid &&
        userNotIncludeProjectsForRaid.map((data) => (
          <>
            <Tweet
              currentUser={currentUser}
              data={data.tweet}
              projectDetail={data.projectDetail}
              poolData={{
                startTime: data?.pool?.startTime,
                endTime: data?.pool?.endTime || data?.pool[" endTime"],
                rewardCategory: data?.pool?.rewardCategory,
                splToken: data?.pool?.splToken,
              }}
            />
          </>
        ))}
      {/* {currentUser &&
        userNotIncludeProjectsForMention &&
        userNotIncludeProjectsForMention?.map((data) => (
          <>
            <MentionProjects
              currentUsers={currentUser}
              datas={data}
              mention={true}
            />
          </>
        ))} */}

     
    </>
  );
};
export default OtherProjects;
