import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  API_KEY = "5f20b6e108fa55262f10bdb97f9ded48"; // Put your key here!
  movies: any[] = [];
  isLoading = false;
  favorites: number[] = JSON.parse(localStorage.getItem("myFavs") || "[]");

  ngOnInit() {
    this.getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`);
  }

  async getMovies(url: string) {
    this.isLoading = true;
    const res = await fetch(url);
    const data = await res.json();
    this.movies = data.results;
    this.isLoading = false;
  }

  searchMovie(event: any) {
    const val = event.target.value;
    const url = val 
      ? `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${val}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`;
    this.getMovies(url);
  }

  toggleFav(e: Event, id: number) {
    e.stopPropagation();
    this.favorites.includes(id) 
      ? this.favorites = this.favorites.filter(fid => fid !== id)
      : this.favorites.push(id);
    localStorage.setItem("myFavs", JSON.stringify(this.favorites));
  }

  isFavorite(id: number) { return this.favorites.includes(id); }
}