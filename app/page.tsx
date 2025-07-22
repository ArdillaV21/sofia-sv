"use client"

import { useState, useEffect } from "react"
import { Heart, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface PhotoData {
  id: string
  title: string
  image: string
  text: string
}

const photosData: PhotoData[] = [
  {
    id: "besos",
    title: "Besos",
    image: "/besos.jpeg",
    text: "Tus besos saben a amor. Con solo uno, todo se olvida. Pero tienes algo especial, algo que creo comprender: la chispa de un beso, con el toque único de tu sensibilidad y cuidado.",
  },
  {
    id: "sonrisa",
    title: "Sonrisa",
    image: "/sonrisa.jpeg",
    text: "Tu sonrisa, tan alegre, llena mi alma. Deseo verla en cada logro y en cada fracaso, porque en ella se refleja el entusiasmo y el disfrute, irradiando luz tan brillante.",
  },
  {
    id: "abrazos",
    title: "Abrazos",
    image: "/abrazos.jpeg",
    text: "Me enseñaste un hogar en un abrazo, lo cual me resulta sorprendente, ya que nunca me atrajeron ninguno de los dos. Quizás era simplemente porque tenía que encontrarte para finalmente sentirme en casa.",
  },
  {
    id: "aventuras",
    title: "Aventuras",
    image: "/aventuras.jpeg",
    text: "Aventuras guardadas en mi memoria y corazón, explorar, resignificar y conocer, forjando nuestro camino en conjunto. Por más aventuras que conquistar!",
  },
  {
    id: "la-cotidiana",
    title: "La cotidiana",
    image: "/ojos-confidentes.jpeg",
    text: "Algunos escritores literarios han sido capaces de sumergirse en el realismo mágico, transformando lo cotidiano en algo mágico. El realismo mágico, al introducir elementos extraordinarios en la vida diaria, convierte lo mundano en algo misterioso y encantador. Esta corriente invita al lector a cuestionar y explorar las complejidades de la existencia humana y su relación con el mundo que lo rodea.",
  },
  {
    id: "ojos-confidentes",
    title: "Ojos confidentes",
    image: "/la-cotidiana.jpeg",
    text: "Las miradas no mienten, y esta foto lo deja en claro. Poder encontrarnos en nuestros ojos, saber lo que pensamos o cómo nos sentimos. Te considero mi confidente, por eso siempre te ofrezco mi mirada más sincera.",
  },
  {
    id: "segundo-aniversario",
    title: "Segundo Aniversario",
    image: "/2doAniversario.jpg",
    text: "Dos años de amor, risas, aventuras y crecimiento juntos. Cada día a tu lado es un regalo que atesoro en mi corazón. Gracias por hacer de estos dos años los más hermosos de mi vida.",
  },
  {
    id: "nuestros-suenos",
    title: "Nuestros Sueños",
    image: "/sueños.jpeg",
    text: "Soñamos juntos, construimos juntos, y cada meta alcanzada es más dulce cuando la compartimos. Nuestros sueños se entrelazan como nuestras manos, creando un futuro lleno de posibilidades.",
  },
]

export default function SofiaApp() {
  const [showGallery, setShowGallery] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  // Simulación desactivada: comportamiento real
  const SIMULATE = false; // Cambia a true para simular
  const initialSimulatedDate = new Date(new Date("2025-07-22T00:00:00").getTime() - 10000);
  const [simulatedNow, setSimulatedNow] = useState(initialSimulatedDate);
  const now = SIMULATE ? simulatedNow : new Date();

  const calculateTimeLeft = (date = now) => {
    const targetDate = new Date("2025-07-22T00:00:00")
    const difference = targetDate.getTime() - date.getTime()
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const isAnniversaryPassed = (date = now) => {
    const targetDate = new Date("2025-07-22T00:00:00")
    return date >= targetDate
  }

  const getPhotosToShow = () => {
    if (isAnniversaryPassed(now)) {
      return photosData // Mostrar todas las fotos incluyendo las nuevas
    }
    return photosData.slice(0, 6) // Mostrar solo las primeras 6 fotos
  }

  useEffect(() => {
    if (SIMULATE) {
      let interval: NodeJS.Timeout;
      setTimeLeft(calculateTimeLeft(simulatedNow));
      interval = setInterval(() => {
        setSimulatedNow((prev) => {
          const next = new Date(prev.getTime() + 1000);
          setTimeLeft(calculateTimeLeft(next));
          return next;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(new Date()));
      }, 1000)
      setTimeLeft(calculateTimeLeft(new Date()))
      return () => clearInterval(timer)
    }
  }, [])

  const openGallery = () => {
    setShowGallery(true)
  }

  const closeGallery = () => {
    setShowGallery(false)
    setSelectedPhoto(null)
  }

  const openPhotoModal = (photo: PhotoData) => {
    setSelectedPhoto(photo)
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
  }

  if (!showGallery) {
    const anniversaryReached = isAnniversaryPassed(simulatedNow);
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4">
        {/* Contador de aniversario o mensaje especial */}
        <div className="text-center w-full max-w-md">
          {anniversaryReached ? (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg px-2 animate-pulse">
              ¡Feliz 2do aniversario mi amor!
            </h2>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg px-2">
                2do Aniversario
              </h2>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                  <div className="flex flex-col">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-600">{timeLeft.days}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Días</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-600">{timeLeft.hours}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Horas</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-600">{timeLeft.minutes}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Minutos</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-600">{timeLeft.seconds}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Segundos</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Botón de corazón */}
        <button onClick={openGallery} className="group relative touch-manipulation">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-pink-500 group-hover:text-pink-600 transition-colors" />
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 pt-4 sm:pt-6 lg:pt-8">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg mx-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Galería de nuestro amor</h1>
            <span className="text-lg sm:text-xl lg:text-2xl">💖</span>
          </div>
          <Button
            onClick={closeGallery}
            variant="ghost"
            size="sm"
            className="mt-3 sm:mt-4 text-gray-700 hover:text-gray-900 touch-manipulation min-h-[44px]"
          >
            <X className="w-4 h-4 mr-2" />
            Cerrar
          </Button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          {getPhotosToShow().map((photo) => (
            <div
              key={photo.id}
              onClick={() => openPhotoModal(photo)}
              className="group cursor-pointer touch-manipulation"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                <div className="aspect-square relative overflow-hidden rounded-xl mb-3 sm:mb-4">
                  <Image
                    src={photo.image || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-center text-gray-800 italic px-2">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={closePhotoModal}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-h-[95vh] overflow-y-auto">
          {selectedPhoto && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6">
              {/* Photo */}
              <div className="relative aspect-square overflow-hidden rounded-xl order-1 lg:order-1">
                <Image
                  src={selectedPhoto.image || "/placeholder.svg"}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 95vw, 50vw"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-2 lg:order-2 px-2 sm:px-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 italic">
                  {selectedPhoto.title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center max-w-prose mx-auto">
                  {selectedPhoto.text}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
