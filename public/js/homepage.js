const options = {
  resource_type: "video",
};

cloudinary.v2.api.resources(options).then((result) => {
  // Extract URLs from the result for videos
  const videoUrls = result.resources
    .filter((resource) => resource.resource_type === "video") // Filter only video resources
    .map((resource) => resource.url);

  console.log(videoUrls);
});
