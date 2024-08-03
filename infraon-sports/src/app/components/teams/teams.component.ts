import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  badminton_map: { [key: string]: string } = {};
  badmintonArray:any
  constructor(private firestore: AngularFirestore) {}

  async ngOnInit() {
    const docRef = this.firestore.collection("maps").doc("badmiton_team_map");
    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      this.badminton_map = doc.data() as { [key: string]: string };
      console.log(this.badminton_map);
      // Function to extract numeric part from team key
       this.badmintonArray = Object.entries(this.badminton_map);
      const extractTeamNumber = (key: string): number => {
        const match = key.match(/\d+/);  // Match digits in the key
        return match ? parseInt(match[0], 10) : 0;  // Return the numeric part or 0 if no match
      };

      // Sort the array based on the numeric part of the team names
      this.badmintonArray.sort((a, b) => {
        const teamNumberA = extractTeamNumber(a[0]);
        const teamNumberB = extractTeamNumber(b[0]);
        return teamNumberA - teamNumberB;
      });

      // Log the sorted array to verify
      console.log(this.badmintonArray);

    } else {
      console.log("No such document!");
    }
  }
  
}
