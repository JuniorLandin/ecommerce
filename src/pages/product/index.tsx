import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export function Product() {

  const { id } = useParams();
  const [produto, setProduto] = useState<ProductData>()
  const [loading, setLoading] = useState(true);

  const { addItemCart } = useContext(CartContext)

  const navigate = useNavigate()

  useEffect(() => {
    async function loadApi(){
      await api.get<ProductData>(`products/${id}`)
      .then((response) => {
        setProduto(response.data)
        setLoading(false)
      })
      .catch(() => {
        navigate("/", {
          replace: true
        })
        return
      })
    }

    loadApi();
  }, [id, navigate])

  function handleAddCartItem(item: ProductData){
    toast.success("Produto adicionado com sucesso!!")
    addItemCart(item)
  }

  if(loading){
    return(
      <div>
        <h1>Carregando Produto</h1>
      </div>
    )
  }

  return(
    <div className="w-full max-w-screen-md mx-auto mt-6">
        <main >
          <section className="flex w-full gap-x-16">
            <div>
              <img
               className="w-full rounded-lg max-h-70 mb-2 object-contain"
               src={produto?.cover} 
               alt={produto?.title} 
               />
            </div>
            <div className="max-w-md">
              <h1 className="font-bold text-zinc-900 text-xl">{produto?.title}</h1>
              <p>{produto?.description}</p>
              <div className="mt-2 flex items-center">
                <strong className="font-medium text-zinc-900 mr-3">R$ {produto?.price}</strong>
                {produto && (
                  <Link to={"/cart"}>
                    <button className="bg-zinc-900 p-1 rounded" onClick={() => handleAddCartItem(produto)}>
                      <BsCartPlus size={20} color="#fff"/>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </section>
        </main>
    </div>
  )
}