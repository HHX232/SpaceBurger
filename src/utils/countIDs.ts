
function countIDs(arrayOfIDs: string[]): { idString: string; idCount: number }[] {
   const idCounts: { [id: string]: number } = {};
   arrayOfIDs.forEach((id) => {
     if (idCounts[id]) {
       idCounts[id]++;
     } else {
       idCounts[id] = 1;
     }
   });
 
   return Object.keys(idCounts).map((id) => ({
     idString: id,
     idCount: idCounts[id],
   }));
 }
 export default countIDs