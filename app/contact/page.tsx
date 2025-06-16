import { Mail, MapPin, Phone, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact & Booking | Peak\'O Music',
  description: 'Contactez Peak\'O pour vos demandes de booking, collaborations ou toute question. DJ Hardstyle disponible pour événements.',
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 pt-32 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contact & <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">Booking</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Prêt à faire vibrer votre événement ? Contactez-moi pour discuter de votre projet 
              et créer une expérience Hardstyle inoubliable.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Envoyez-moi un message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Objet de votre demande"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Type d'événement *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="private">Événement privé</option>
                      <option value="club">Boîte de nuit</option>
                      <option value="festival">Festival</option>
                      <option value="corporate">Événement corporate</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date d'événement
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget approximatif
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 1500€ - 3000€"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Décrivez votre événement, vos attentes, le lieu, le nombre d'invités..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-lg font-medium bg-orange-600 text-white hover:bg-orange-700 rounded-lg transition-colors"
                >
                  <Mail className="mr-2" size={20} />
                  Envoyer ma demande
                </button>
                
                <p className="text-gray-500 text-sm text-center">
                  * Champs obligatoires. Vos données sont traitées de manière confidentielle.
                </p>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Informations pratiques</h2>
              
              <div className="space-y-8">
                {/* Contact Details */}
                <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Contact direct</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="text-orange-400 mr-3" size={20} />
                      <span className="text-gray-300">booking@peako-music.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-orange-400 mr-3" size={20} />
                      <span className="text-gray-300">+33 6 XX XX XX XX</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="text-orange-400 mr-3" size={20} />
                      <span className="text-gray-300">France</span>
                    </div>
                  </div>
                </div>
                
                {/* Response Time */}
                <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Délais de réponse</h3>
                  <div className="flex items-start">
                    <Clock className="text-orange-400 mr-3 mt-0.5" size={20} />
                    <div>
                      <p className="text-gray-300 mb-2">
                        Je réponds généralement sous <strong className="text-white">24-48h</strong> 
                        pour toute demande de booking.
                      </p>
                      <p className="text-gray-400 text-sm">
                        Pour les demandes urgentes, n'hésitez pas à me contacter directement par téléphone.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Booking Info */}
                <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Informations booking</h3>
                  <div className="space-y-3 text-gray-300">
                    <p><strong className="text-white">Tarifs :</strong> Variables selon l'événement</p>
                    <p><strong className="text-white">Disponibilité :</strong> Europe principalement</p>
                    <p><strong className="text-white">Matériel :</strong> Setup technique fourni</p>
                    <p><strong className="text-white">Durée :</strong> Sets de 30min à 2h</p>
                  </div>
                </div>
                
                {/* Useful Info */}
                <div className="rounded-lg border border-orange-600/20 bg-orange-900/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Informations utiles</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Date et horaires de l'événement</p>
                    <p>• Lieu et nombre d'invités attendus</p>
                    <p>• Type de musique souhaité</p>
                    <p>• Matériel disponible sur place</p>
                    <p>• Budget et modalités de paiement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}