import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  badminton_group_map: any = {};
  badminton_map: any = {};

  constructor(private firestore: AngularFirestore) {}

  async ngOnInit() {
    const docRef2 = this.firestore.collection("maps").doc("badmiton_team_map");
    const doc2 = await docRef2.get().toPromise();
    if (doc2.exists) {
      this.badminton_map = doc2.data() as { [key: string]: string };
      console.log(this.badminton_map);
    } else {
      console.log("No such document!");
    }

    const docRef = this.firestore.collection("maps").doc("badminton_group");
    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      this.badminton_group_map = doc.data();
      console.log(this.badminton_group_map);
      for (let group in this.badminton_group_map) {
        this.badminton_group_map[group] = this.sortGroupByScore(this.badminton_group_map[group]);
      }
    } else {
      console.log("No such document!");
    }
  }

  getGroupNames(): string[] {
    return Object.keys(this.badminton_group_map).sort();
  }
  

  getTeams(groupName: string): { name: string, stats: { wins: number, lost: number, score: number } }[] {
    const group = this.badminton_group_map[groupName];
    return Object.keys(group).map(teamName => ({
      name: this.badminton_map[teamName],
      stats: group[teamName]
    }));
  }

  sortGroupByScore(group: { [key: string]: { wins: number; lost: number; score: number } }) {
    // Convert object to an array
    let groupArray = Object.entries(group).map(([team, stats]) => ({ team, ...stats }));

    // Sort the array based on score
    groupArray.sort((a, b) => b.score - a.score);

    // Convert array back to an object
    return groupArray.reduce((acc, item) => {
      acc[item.team] = { score: item.score, wins: item.wins, lost: item.lost };
      return acc;
    }, {});
  }
}
