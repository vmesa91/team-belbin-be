

dataRolesBelbin = [
    { group: 'Roles de Acción', _id:'implementador' , name: 'Implementador'}, 
    { group: 'Roles de Acción', _id:'impulsor' , name: 'Impulsor'}, 
    { group: 'Roles de Acción', _id:'finalizador' , name: 'Finalizador'}, 
    { group: 'Roles Mentales', _id:'monitor-evaluador' , name: 'Monitor Evaluador'},
    { group: 'Roles Mentales', _id:'especialista' , name: 'Especialista'},
    { group: 'Roles Mentales', _id:'cerebro' , name: 'Cerebro'},
    { group: 'Roles Sociales', _id:'investigador-recursos' , name: 'Investigador de Recursos'},
    { group: 'Roles Sociales', _id:'cohesionador' , name: 'Cohesionador'},
    { group: 'Roles Sociales', _id:'coordinador' , name: 'Coordinador'}
]    

const classifyBelbin = ( members )  => {

    const gruposRoles = dataRolesBelbin.reduce((acc, grupo) => {
        acc[grupo._id] = grupo.name;
        return acc;
      }, {});

    const miembrosAgrupados = {};

    members.forEach((member) => {
        member.belbinRol.forEach((rol) => {
          const grupo = gruposRoles[rol];
          if (grupo) {
            if (!miembrosAgrupados[grupo]) {
              miembrosAgrupados[grupo] = [];
            }
            miembrosAgrupados[grupo].push(member);
          }
        });
      });
    
      const contadorRoles = {
        'Roles de Acción': 0,
        'Roles Mentales':  0 ,
        'Roles Sociales': 0 ,
      };

      for (const grupo in miembrosAgrupados) {
        for (const rol of dataRolesBelbin) {
          if (rol.name === grupo) {
            contadorRoles[rol.group] +=  miembrosAgrupados[grupo].length;
            break;
          }
        }
      }
    
      return contadorRoles;
    }


module.exports = {
    classifyBelbin
}