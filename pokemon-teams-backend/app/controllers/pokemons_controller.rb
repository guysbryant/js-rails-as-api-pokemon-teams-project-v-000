class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params["trainer_id"])
    if pokemon.save
      pokemon
    end
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
  end
end
