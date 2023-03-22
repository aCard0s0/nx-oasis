import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, finalize, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CandlestickApiService {

  constructor(private http: HttpClient) {
  }

  // TODO: logs
  fetchOHLCCandles(url: string) {
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching options:', error);
        return of([]);
      }),
      finalize(() => {
        // Perform any final cleanup here, e.g. stop a loading spinner
      })
    )
  }

}
