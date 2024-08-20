import React, { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_DIRECTIONS } from '@/queries'
import SelectDirections from './parts/SelectDirections'
import { useBearStore } from '@/store'

type direction = {
  price: number
  place: string
}

interface DirectionsAttributes {
  attributes: {
    title: string
    Cantons: direction[]
    Districts: direction[]
  }
}

interface DirectionsArrs {
  titles: string[]
  Cantons: string[]
  Districts: string[]
}

interface Props {
  province: string
  cantons: string
  districts: string
}

type Directions = DirectionsAttributes[]
const Directions = ({ province, cantons, districts }: Props) => {
  const { error, loading, data } = useQuery(GET_DIRECTIONS)
  const [directionsArrs, setDirectionsArrs] = useState<DirectionsArrs | null>(
    null
  )
  const [originalDirections, setOriginalDirections] =
    useState<Directions | null>(null)
  const [choosenOption, setChoosenOption] = useState(province)
  const [choosenCaptons, setChoosenCaptons] = useState(cantons)
  const [choosenDistricts, setChoosenDistricts] = useState(districts)
  const { setSelectedDirection, selectedDirection, setDirectionPrice } =
    useBearStore()

  useEffect(() => {
    if (!loading) {
      const directions: Directions = data.directions.data
      setOriginalDirections(directions)
      const titles = directions.map((address) => {
        return address.attributes.title
      })

      const cantons = directions.flatMap((address) =>
        address.attributes.Cantons.map((canton) => canton.place)
      )

      const districts = directions.flatMap((address) =>
        address.attributes.Districts.map((district) => district.place)
      )

      setDirectionsArrs({
        titles,
        Cantons: cantons,
        Districts: districts,
      })
    }
  }, [loading])

  useEffect(() => {
    if (originalDirections) {
      let filteredCantons: string[] = []
      let filteredDistricts: string[] = []

      if (choosenOption && choosenOption !== province) {
        const selectedProvince = originalDirections.find(
          (direction) => direction.attributes.title === choosenOption
        )

        if (selectedProvince) {
          filteredCantons = selectedProvince.attributes.Cantons.map(
            (canton) => canton.place
          )
          filteredDistricts = selectedProvince.attributes.Districts.map(
            (district) => district.place
          )
        }
        const newArrs = {
          titles: directionsArrs?.titles || [],
          Cantons: filteredCantons,
          Districts: filteredDistricts,
        }

        setDirectionsArrs(newArrs)
      }
    }
  }, [choosenOption])

  useEffect(() => {
    if (originalDirections) {
      let filteredCantons: string[] = []
      let filteredDistricts: string[] = []

      if (choosenCaptons && choosenCaptons !== cantons) {
        const selectedCapton = originalDirections.find((direction) =>
          direction.attributes.Cantons.filter(
            (canton) => canton.place === choosenCaptons
          )
        )

        if (selectedCapton) {
          filteredCantons = selectedCapton.attributes.Cantons.map(
            (canton) => canton.place
          )
          filteredDistricts = selectedCapton.attributes.Districts.map(
            (district) => district.place
          )
        }
        const newArrs = {
          titles: directionsArrs?.titles || [],
          Cantons: filteredCantons,
          Districts: filteredDistricts,
        }

        setDirectionsArrs(newArrs)
      }
    }
  }, [choosenCaptons])

  useEffect(() => {
    if (originalDirections) {
      let filteredCantons: string[] = []
      let filteredDistricts: string[] = []

      if (choosenDistricts && choosenDistricts !== districts) {
        const selectedDistricts = originalDirections.find((direction) =>
          direction.attributes.Districts.filter(
            (district) => district.place === choosenDistricts
          )
        )

        if (selectedDistricts) {
          filteredCantons = selectedDistricts.attributes.Cantons.map(
            (canton) => canton.place
          )
          filteredDistricts = selectedDistricts.attributes.Districts.map(
            (district) => district.place
          )
        }
        const newArrs = {
          titles: directionsArrs?.titles || [],
          Cantons: filteredCantons,
          Districts: filteredDistricts,
        }

        setDirectionsArrs(newArrs)
      }
    }
  }, [choosenDistricts])

  useEffect(() => {
    if (
      choosenCaptons !== cantons &&
      choosenDistricts !== districts &&
      choosenOption !== province
    ) {
      const newDirection = {
        province: choosenOption,
        cantons: choosenCaptons,
        districts: choosenDistricts,
      }
      setSelectedDirection(newDirection)
    }
  }, [choosenCaptons, choosenDistricts, choosenOption])

  useEffect(() => {
    if (choosenCaptons && choosenDistricts && originalDirections) {
      let cantonPrice = 0
      let districtPrice = 0

      originalDirections.forEach((direction) => {
        const canton = direction.attributes.Cantons.find(
          (canton) => canton.place === choosenCaptons
        )
        if (canton) {
          cantonPrice = canton.price
        }

        const district = direction.attributes.Districts.find(
          (district) => district.place === choosenDistricts
        )
        if (district) {
          districtPrice = district.price
        }
      })

      const totalPrice = cantonPrice + districtPrice
      setDirectionPrice(totalPrice)
    }
  }, [choosenCaptons, choosenDistricts, originalDirections])

  if (loading) return
  if (error) return
  if (!directionsArrs) return

  return (
    <div className='w-full flex flex-col gap-8 md:gap-4 md:flex-row'>
      <SelectDirections
        title={choosenOption}
        options={directionsArrs.titles}
        setOption={setChoosenOption}
      />
      <SelectDirections
        title={choosenCaptons}
        options={directionsArrs.Cantons}
        setOption={setChoosenCaptons}
      />
      <SelectDirections
        title={choosenDistricts}
        options={directionsArrs.Districts}
        setOption={setChoosenDistricts}
      />
    </div>
  )
}
export default Directions
