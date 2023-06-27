
const mostPopularProfiles = ( profiles ) => {

    
    const contProfiles = profiles?.map( (profile) => { 
            return { name: profile.name,
            members: profile.members.length}
         } )


    const contProfilesOrder = contProfiles.sort(sortByMembers)
    return contProfilesOrder.slice(0,4);     
}


// Sort members

const sortByMembers = (a, b) =>  {
    return b.members - a.members;
  }

  module.exports = {
    mostPopularProfiles
}