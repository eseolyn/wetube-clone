import Video from "../models/Video";

/* 
callback function:
Video.find({}, (error, videos) => {
  if(error){
    return res.render('server-error')
  }
  return res.render("home", { pageTitle: "Home", videos: [] });
});

async & await:
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}); // JS will wait here until finish finding DB
    return res.render("home", { pageTitle: "Home", videos }); // when success find DB
  } catch { // when occur error while find DB
    return res.render("server-error");
  }
};
*/

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  return res.render("edit", { pageTitle: `Edit:${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  //not need all videoObj but filter so can use .exists()
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  // here we will add a video to the DB videos array.
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

/* Video.create({obj...}) is same code with:
  const video = new Video ({obj...})
  await video.save()
*/
