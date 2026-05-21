export const protect = async (req,res,next) => {
  try{
    // Extract authentication info from request (e.g. Clerk / custom auth middleware)
    const {userId} =  req.auth();

    console.log("Auth middleware executed, userId:", userId);

    // If no userId exists, user is not logged in
    if(!userId){
      return res.json({success: false, message: "not authenticated" })
    }

    // Continue to next middleware or route handler

    console.log("User authenticated, proceeding to next middleware/route handler");

    next()
  } catch (error) {
    res.json({success: false, message: error.message })

  }
}
