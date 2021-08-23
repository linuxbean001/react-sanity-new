import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "dzp73orv", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  token: 'skvhzNCu7asKDuQsis8XsyXLHGsuqCvLeK11lxhNMAKbcK4ry41l3KZOAt1kqS8FP2B2ObLssq1pxVuPdrHwiNc72RvofnUn0bAS0W9n1P78aVFZ8Z9gDi0bOh5xT0Svi3PODxjGlOI5KstVhpLigtOxQt9RC5IZNh4yb3dCovAf86bvKSmJ',
  useCdn: true,
});