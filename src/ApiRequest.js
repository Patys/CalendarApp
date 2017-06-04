class ApiRequest {
  static getUsers = (next) => {
    fetch(`https://timesheet-staging-aurity.herokuapp.com/api/users`)
    .then((response) => {
        return response.json();
      }).then((json) => {
        next(json);
      }).catch((ex) => {
        console.log('parsing failed', ex);
      });
  }

  static getDataForAMonth = (user_id, month, year, next) => {
    let url = 'https://timesheet-staging-aurity.herokuapp.com/api/training/weeks/'+month+'/'+year+'/'+user_id;
    fetch(url)
    .then((response) => {
        return response.json();
      }).then((json) => {
        next(json);
      }).catch((ex) => {
        console.log('parsing failed', ex);
    });
  }

  static approveWeek = (week_id, user_id, next) => {
    let url = 'https://timesheet-staging-aurity.herokuapp.com/api/training/weeks/'+week_id+'/users/' + user_id;
    console.log('Request to ' + url);
    let formData = new FormData();
    formData.append('status', 'approved');
    fetch(url, {
        method: 'PUT',
        body: formData
    })
    .then((response) => {
        return response.json();
      }).then((json) => {
        next(json);
      }).catch((ex) => {
        console.log('parsing failed', ex);
    });
  }

  static rejectWeek = (week_id, user_id, next) => {
    let url = 'https://timesheet-staging-aurity.herokuapp.com/api/training/weeks/'+week_id+'/users/' + user_id;
    console.log('Request to ' + url);
    let formData = new FormData();
    formData.append('status', 'rejected');
    fetch(url, {
        method: 'PUT',
        body: formData
    })
    .then((response) => {
        return response.json();
      }).then((json) => {
        next(json);
      }).catch((ex) => {
        console.log('parsing failed', ex);
    });
  }
}

export default ApiRequest;
