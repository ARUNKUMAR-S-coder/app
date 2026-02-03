import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true, // Required for standalone components
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page implements OnInit {
  // Replace with your actual TMDB Key
  API_KEY = "5f20b6e108fa55262f10bdb97f9ded48"; 
  IMG_PATH = "https://image.tmdb.org/t/p/w500";
  
  movies: any[] = [];
  isLoading = false;

  ngOnInit() {
    this.getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`);
  }

  async getMovies(url: string) {
    this.isLoading = true;
    try {
      const res = await fetch(url);
      const data = await res.json();
      this.movies = data.results;
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  searchMovie(event: any) {
    const val = event.target.value;
    const url = val 
      ? `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${val}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`;
    this.getMovies(url);
  }
}