"use strict"

let gender = new Set() // has-gender
let position = new Set() // plays-in
let range_type = new Set() // has-species
let resource = new Set() // uses-resource
let species = new Set() // has-range-type
let region = new Set() // belongs-to
let axuillary_data = [gender, position, range_type, resource, species, region]

const column_names = ["gender", "position", "species", "resource", "range-type", "region", "release"]
const relations = ["has-gender", "plays-in", "has-species", "uses-resource", "has-range-type", "belongs-to", "released-in"]

const champion_name_input = document.querySelector("#champion-name")
const champion_data_input = document.querySelector("#champion-data")
const generate_champion = document.querySelector("#generate-champion")
const fluent_data_output = document.querySelector("#fluent-data")
generate_champion.addEventListener("click", () => {
  fluent_data_output.value = convertChampionDataToFluent(champion_name_input.value, champion_data_input.value)
})

const all_champions_output = document.querySelector("#all-champions")
const generate_all_champions = document.querySelector("#generate-all-champions")
generate_all_champions.addEventListener("click", () => {
  getChampionsData()
})

const guessed_champions_data = document.querySelector("#guessed-champions-data")
const guessed_champions = document.querySelector(".guessed-champions")
const add_champion = document.querySelector("#add-champion")
add_champion.addEventListener("click", () => {
  addGuessedChampionContainer()
  guessed_champions_data.value = ""
})

const query_output = document.querySelector("#query")
const generate_SPARQL_button = document.querySelector("#generate-sparql")
generate_SPARQL_button.addEventListener("click", () => {
  query_output.value = generateSPARQL()
})

function getChampionsData() {
  fetch("./data/champions_data.txt")
    .then((res) => res.text())
    .then((champions_data) => {
      fetch("./data/champions.txt")
        .then((res) => res.text())
        .then((champions) => {
          fluent_data_output.value = ""

          champions_data = champions_data.replaceAll(/\r\n|\r/g, "\n").split("\n\n")
          champions = [...new Set(champions.replaceAll(/\r\n|\r/g, "\n").split("\n"))]

          const max = Math.min(champions.length, champions_data.length)

          let all_champions = ""

          for (let i = 0; i < max; i++) {
            all_champions += convertChampionDataToFluent(champions[i], champions_data[i])
            all_champions += "\n\n"
          }

          for (let i = 0; i < axuillary_data.length; i++) {
            const data = [...axuillary_data[i]]
            let fluent_str = `Comment:\n---------------- ${normalizeStr(column_names[i])} ----------------.\n`
            for (let j = 0; j < data.length; j++) fluent_str += `${data[j]} is a ${column_names[i]}.\n`
            fluent_data_output.value += `${fluent_str}\n`
          }

          fluent_data_output.value += `Comment:\n---------------- Champions ----------------.\n`
          fluent_data_output.value += all_champions
        })
    })
}

function convertChampionDataToFluent(champion_name, champion_data) {
  champion_name = normalizeStr(champion_name)

  let champion_data_str = champion_data.replaceAll("\n", ";")
  champion_data_str = champion_data_str.replaceAll(",;", ",")

  /* -------------- champion -------------- */
  let fluent_str = `${champion_name} is a champion.\n`
  let importance = 0

  /* -------------- gender, position, species, resource, range, region -------------- */
  const champion_data_arr = champion_data_str.split(";")

  for (let i = 0; i < relations.length - 1; i++) {
    const values_arr = champion_data_arr[i].split(",").map((val) => normalizeStr(val))
    importance += values_arr.length

    fluent_str += `${champion_name} ${relations[i]} ${values_arr[0]}`
    axuillary_data[i].add(values_arr[0])

    if (values_arr.length > 1) {
      for (let j = 1; j < values_arr.length; j++) {
        fluent_str += ` and ${relations[i]} ${values_arr[j]}`
        axuillary_data[i].add(values_arr[j])
      }
    }

    fluent_str += ".\n"
  }

  /* -------------- release -------------- */
  const release_year = champion_data_arr[6].split(",")[0]
  fluent_str += `${champion_name} ${relations[6]} equal-to ${release_year}.\n`

  /* -------------- importance -------------- */
  fluent_str += `${champion_name} has-importance equal-to ${importance}.`

  return fluent_str
}

function normalizeStr(str) {
  let normalized = str.replaceAll(/'| /g, "-")
  normalized = normalized.split("-")
  normalized = normalized.map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
  normalized = normalized.join("-")
  return normalized
}

function addGuessedChampionContainer() {
  const champions_data = guessed_champions_data.value.replaceAll(/\r\n|\r/g, "\n").split("\n\n")

  for (let champion of champions_data) {
    let champion_data_str = champion.replaceAll("\n", ";")
    champion_data_str = champion_data_str.replaceAll(",;", ",")
    const champion_data_arr = champion_data_str.split(";")

    /*
    <div class="guessed-champion">
      <div class="gender"></div>
      <div class="position"></div>
      <div class="species"></div>
      <div class="resource"></div>
      <div class="range-type"></div>
      <div class="region"></div>
      <div class="release"></div>
      <button class="delete">X</button>
    </div>
    */

    const guessed_champion = document.createElement("div")
    guessed_champion.className = "guessed-champion"

    for (let i = 0; i < column_names.length; i++) {
      guessed_champion.appendChild(createChampionInfoSquare(column_names[i], champion_data_arr[i]))
    }

    const delete_button = document.createElement("button")
    delete_button.className = "delete"
    delete_button.innerText = "X"
    delete_button.addEventListener("click", () => guessed_champion.remove())
    guessed_champion.appendChild(delete_button)

    guessed_champions.appendChild(guessed_champion)
  }
}

function createChampionInfoSquare(class_name, champion_data) {
  const square = document.createElement("div")
  square.className = `${class_name} incorrect`
  square.innerHTML = champion_data.replaceAll(",", "<br>")

  square.addEventListener("click", () => {
    if (square.classList.contains("correct")) square.classList.replace("correct", "incorrect")
    else if (square.classList.contains("incorrect")) square.classList.replace("incorrect", "partialy")
    else if (square.classList.contains("partialy")) square.classList.replace("partialy", "correct")
  })

  return square
}

function generateSPARQL() {
  /*
  SELECT ?x {
    ?x rdf:type :Champion.
    ?x :hasGender :Male.
    FILTER (?g IN (:Male, :Other))
    ?x :playsIn :Top.
    FILTER NOT EXISTS {?x :hasSpecies :Darkin.}
    FILTER NOT EXISTS {?x :hasResource :Manaless.}
    ?x :hasRangeType :Melee.
    FILTER NOT EXISTS {?x :belongsTo :Runeterra.}
    FILTER NOT EXISTS {?x :belongsTo :Shurima.}
    ?x :releasedsIn ?y.
    FILTER (?y < 2013).
    FILTER (?y < 2013).
    ?x :hasImportance ?ord.
  } ORDER BY DESC(?ord)
  */

  const data = getGuessedChampionsData()

  let query = "SELECT ?x {\n"
  query += "\t?x rdf:type :Champion.\n"

  const columns = [
    // name, relation, variable
    ["gender", "hasGender", "g"],
    ["position", "playsIn", "pos"],
    ["species", "hasSpecies", "sp"],
    ["resource", "usesResource", "res"],
    ["range_type", "hasRangeType", "rt"],
    ["region", "belongsTo", "reg"],
  ]

  for (let column of columns) {
    const correct = [...data[column[0]].correct]
    const incorrect = [...data[column[0]].incorrect]
    const partialy = [...data[column[0]].partialy]

    if (correct.length > 0) {
      correct.forEach((value) => {
        value = normalizeStr(value).replaceAll("-", "")
        query += `\t?x :${column[1]} :${value}.\n`
      })
    } else {
      incorrect.forEach((value) => {
        value = normalizeStr(value).replaceAll("-", "")
        query += `\tFILTER NOT EXISTS {?x :${column[1]} :${value}}.\n`
      })

      if (partialy.length > 0) {
        query += `\t?x :${column[1]} ?${column[2]}.\n`
        query += `\tFILTER (?${column[2]} IN (`
        query += partialy.map((value) => `:${normalizeStr(value).replaceAll("-", "")}`).join(", ")
        query += `)).\n`
      }
    }
  }

  const correct = [...data["release"].correct]
  const incorrect = [...data["release"].incorrect]
  const partialy = [...data["release"].partialy]

  if (correct.length > 0) {
    correct.forEach((value) => (query += `\t?x :releasedsIn ${+value}.\n`))
  } else {
    query += `\t?x :releasedsIn ?y.\n`

    let higher_than = Math.max(0, ...incorrect.map((val) => +val))
    query += `\tFILTER (?y > ${higher_than}).\n`

    let less_than = Math.min(9999, ...partialy.map((val) => +val))
    query += `\tFILTER (?y < ${less_than}).\n`
  }

  query += "\t?x :hasImportance ?ord.\n"
  query += "} ORDER BY DESC(?ord)"

  return query
}

function getGuessedChampionsData() {
  let data = {
    gender: {
      incorrect: new Set(),
      partialy: new Set(),
      correct: new Set(),
    },
    position: {
      incorrect: new Set(),
      partialy: new Set(),
      correct: new Set(),
    },
    species: {
      incorrect: new Set(),
      partialy: new Set(),
      correct: new Set(),
    },
    resource: {
      incorrect: new Set(),
      partialy: new Set(),
      correct: new Set(),
    },
    range_type: {
      incorrect: new Set(),
      partialy: new Set(),
      correct: new Set(),
    },
    region: {
      incorrect: new Set(),
      partialy: new Set(),
      correct: new Set(),
    },
    release: {
      incorrect: new Set(), // higher_than
      partialy: new Set(), // lower_than
      correct: new Set(),
    },
  }

  const guessed_champions_containers = document.querySelectorAll(".guessed-champion")

  guessed_champions_containers.forEach((champion_container) => {
    for (let column of column_names) {
      if (data[column.replaceAll("-", "_")].correct.size > 0) continue

      const container = champion_container.querySelector(`.${column}`)
      const values = container.innerText.split("\n")

      for (let type of ["correct", "partialy", "incorrect"]) {
        if (container.classList.contains(type)) {
          values.forEach((value) => data[column.replaceAll("-", "_")][type].add(value))
        }
      }
    }
  })

  return data
}

/*
Who-Or-What is a champion that released-in greater-than 2022?
*/
