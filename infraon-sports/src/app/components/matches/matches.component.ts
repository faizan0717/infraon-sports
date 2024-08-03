import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  badminton_group_map: any = {};
  matches:any; // Array of matches
  filteredMatches: any[] = []; // Array of filtered matches
  team: { [key: string]: string } = {};
  selectedCourt: string = 'all'; // Default value
  haskey = ""
  constructor(private firestore: AngularFirestore) { }

  async ngOnInit() {
    this.haskey = localStorage.getItem('secretKey')
    const docRefteam = this.firestore.collection("maps").doc("badmiton_team_map");
    const docteam = await docRefteam.get().toPromise();
    if (docteam.exists) {
      this.team = docteam.data() as { [key: string]: string };
    } else {
      console.log("No such document!");
    }

    const docRef2 = this.firestore.collection("matches").doc("match");
    const doc2 = await docRef2.get().toPromise();
    if (doc2.exists) {
      this.matches = doc2.data() || [];
      this.matches = this.matches.matches
      var index=0
      this.matches.forEach((element) => {
        const split_team = element["MATCH"].split(' vs ');
        element["index"] = index
        index+=1
        element["team_1"] = this.team[split_team[0]] || split_team[0];
        element["team_2"] = this.team[split_team[1]] || split_team[1];
      });
      this.filterMatches(); // Initialize with default value
    } else {
      console.log("No such document!");
    }

    const docRef = this.firestore.collection("maps").doc("badminton_group");
    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      this.badminton_group_map = doc.data();
      console.log(this.badminton_group_map);
    } else {
      console.log("No such document!");
    }
  }

  filterMatches(): void {
    if (this.selectedCourt === 'all') {
      this.filteredMatches = [...this.matches];
    } else {
      console.log(this.selectedCourt)
      this.filteredMatches = this.matches.filter(match => match.Court === this.selectedCourt);
    }
  }

  onCourtChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCourt = selectElement.value;
    console.log('Selected Court:', this.selectedCourt);
    this.filterMatches(); // Call filtering method
  }

  async addWinner(team_1: string, team_2: string, index: number) {
    const { value: selectedTeam } = await Swal.fire({
      title: 'Select Winner',
      input: 'select',
      inputOptions: {
        [team_1]: team_1,
        [team_2]: team_2
      },
      inputPlaceholder: 'Select a team',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel'
    });
  
    if (selectedTeam) {
      console.log('Selected Team:', selectedTeam);
      const loosing_team_name = selectedTeam === team_1 ? team_2 : team_1;
      const winnerTeamCode = this.findKeyByValue(this.team, selectedTeam);
      const loosingTeamCode = this.findKeyByValue(this.team, loosing_team_name);
  
      // Update the match winner
      this.matches[index].Winner = winnerTeamCode;
      await this.firestore.collection("matches").doc("match").update({ matches: this.matches });
  
      // Update the badminton group map
      this.updateGroupMap(winnerTeamCode, loosingTeamCode);
    }
  }
  
  async updateGroupMap(winnerTeamCode: string, loosingTeamCode: string) {
    const groupMapDoc = await this.firestore.collection("maps").doc("badminton_group").get().toPromise();
    if (groupMapDoc.exists) {
      const groupMap = groupMapDoc.data() as any;
  
      // Update the winner's group
      for (const [group, teams] of Object.entries(groupMap)) {
        if (teams[winnerTeamCode]) {
          teams[winnerTeamCode].wins += 1;
          teams[winnerTeamCode].score += 2;
        }
        if (teams[loosingTeamCode]) {
          teams[loosingTeamCode].lost += 1;
        }
      }
  
      await this.firestore.collection("maps").doc("badminton_group").update(groupMap);
    } else {
      console.log("No such document!");
    }
  }

  findKeyByValue<T>(obj: Record<string, T>, value: T): string | undefined {
    for (const [key, val] of Object.entries(obj)) {
      if (val === value) {
        return key;
      }
    }
    return undefined;
  }
}
