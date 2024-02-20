import {Observable} from 'rxjs';


/*export function createHttpObservable(url:string) {
    return Observable.create(observer => {

        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url, {signal})
            .then(response => {

                if (response.ok) {
                    return response.json();
                }
                else {
                    observer.error('Request failed with status code: ' + response.status);
                }
            })
            .then(body => {

                observer.next(body);

                observer.complete();

            })
            .catch(err => {

                observer.error(err);

            });

        return () => controller.abort()


    });
}*/


export function createHttpObservable(url: string) {

  const controller = new AbortController();
  const signal = controller.signal;

  return Observable.create(observer => {

    fetch(url, {signal})
      .then(response => {
        return response.json();
      })
      .then(jsonBody => {
        observer.next(jsonBody);

        observer.complete(); // terminate http stream by this method

        // observer.next(); // this line would break the observable contract
      })
      .catch(error => {
        observer.error(error); // we are respecting the observable contract: either we are completing or catching an error
      });

    // controller.abort();
    return () => controller.abort();
  });
}



