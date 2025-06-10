export const errorMsg = (err) => {
  console.log(err.name);

  switch (err.name) {
    case "ValidationError":
      return Object.values(err.errors).at(0).message;
    case "Error":
      return err.message;
  }
};
