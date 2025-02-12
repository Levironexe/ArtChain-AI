'use client'
import { useState, useEffect } from 'react';
import { Wand2, History, Sparkles, Palette, RefreshCw, Trash2 , HandHeart, Leaf, Clock, Brush, SquareChevronRight, Eclipse, MessageSquare, ImageIcon, ALargeSmall } from 'lucide-react';
import axios from 'axios';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient} from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { marked } from 'marked';
import Image from 'next/image';

interface PromptHistory {
  id: string,
  name: string,
  timestamp: string,
  style: string,
  image?: string,
  imageIpfs: string,
  price: number
}
interface ChatPromptHistory {
  id: string,
  name: string,
  timestamp: string,
  style: string,
  image?: string,
  imageIpfs: string,
  price: number
}

export default function AIStudio() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatGenerating, setIsChatGenerating] = useState(false);
  const [currentSimpleGeneratedImage, setCurrentSimpleGeneratedImage] = useState<string | null>(null);
  const [currentChatGeneratedImage, setCurrentChatGeneratedImage] = useState<string | null>(null);
  const [interfaceMode, setInterfaceMode] = useState<'simple' | 'chat'>('simple');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: 'Hello! I\'m your AI art assistant. I can help you generate images and adjust settings. What would you like to create today?' }
  ]);

  
  const [promptHistory, setPromptHistory] = useState<PromptHistory[]>([]);
  const [chatPromptHistory, setChatPromptHistory] = useState<ChatPromptHistory[]>([]);
  const [gasBudgetInSUI, setGasBudgetInSUI] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);
  const [mintPriceChat, setMintPriceChat] = useState(0);
  const [nftName, setNftName] = useState('');
  const [nftNameChat, setNftNameChat] = useState('');
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const packageId = "0xc8c7d5883b225e78dfe08031822fe791be784b56113efeb65dfd18ce43d45aa9";
  const account = useCurrentAccount();
  const suiClient = useSuiClient();



  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
// Function to get SUI price in USD
  useEffect(() => {
    updateUSDPrice();
  }, [interfaceMode, mintPrice, mintPriceChat]);

  console.log('Mint price (normal mode)', mintPrice);
  console.log('Mint price (chat mode)',mintPriceChat);
  console.log('Chat length',prompt.length);
  const updateUSDPrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'sui',
          vs_currencies: 'usd'
        },
        headers: {
          'x-cg-demo-api-key': 'CG-U7W2Nv8xyyMk2NKjFSbu1RDA',
        }
      });
      const suiPrice = response.data.sui.usd;
      const suiAmount = interfaceMode === 'simple' ? mintPrice / 1000000000 : mintPriceChat/1000000000;
      setUsdPrice(suiAmount * suiPrice);
    } catch (error) {
      console.error('Error fetching SUI price:', error);
      setUsdPrice(null);
    }
  };

  async function uploadToIPFS(file: Blob) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          pinata_api_key: "0baf74b627621568e99d",
          pinata_secret_api_key: "705892102eaa2cab6ba886590960394cd454aca085c1e198263bca2fedfb9367",
          "Content-Type": "multipart/form-data",
        },
      });

      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      console.log("Uploaded to IPFS:", ipfsUrl);
      return ipfsUrl;
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      alert("Failed to upload image to IPFS.");
      return null;
    }
  }

  
  const handleClearHistory = () => {
    setPromptHistory([]);
  };

  async function handleMintNFT() {
    if (!account) {
      alert("Please connect your Sui wallet first!");
      return;
    }

    if (interfaceMode === 'simple' && !currentSimpleGeneratedImage) {
      alert("Please generate an image before minting!");
      return;
    }
    if (interfaceMode === 'chat' && !currentChatGeneratedImage) {
      alert("Please generate an image before minting!");
      return;
    }

    if (!gasBudgetInSUI) {
      alert("Please enter a gas budget for this transaction!");
      return;
    }
    if (interfaceMode === 'simple' && !nftName) {
      alert("Please enter art name!");
      return;
    }
    if (interfaceMode === 'chat' && !nftNameChat) {
      alert("Please enter art name!");
      return;
    }

    try {
      const tx = new TransactionBlock();
      const { data: coins } = await suiClient.getCoins({
        owner: account.address,
        coinType: '0x2::sui::SUI'
      });
      if (coins.length === 0) {
        alert("Insufficient funds for the transaction!");
        return;
      }

      const requiredAmount = BigInt(mintPrice + (gasBudgetInSUI * 1000000000)); // Total amount needed

      const sufficientCoin = coins.find(coin => 
        BigInt(coin.balance) >= requiredAmount
      );

      if (!sufficientCoin) {
        alert("Insufficient funds for the transaction!");
        return;
      }

      const currentIpfsImageUrl = interfaceMode === 'simple' ? currentSimpleGeneratedImage : currentChatGeneratedImage;
      const actualMintPrice = interfaceMode === 'simple' ? mintPrice : mintPriceChat;
      const actualName = interfaceMode === 'simple' ? nftName : nftNameChat;

      tx.moveCall({
        target: `${packageId}::nft_contract::mint_with_price`,
        arguments: [ 
          tx.object(sufficientCoin.coinObjectId),
          tx.pure(actualMintPrice),  // Price
          tx.pure(actualName), // name
          tx.pure(`Inspired by ${artistName}`),
          tx.pure(currentIpfsImageUrl) // URL
        ]
      });

      tx.setGasBudget(gasBudgetInSUI * 1000000000);

      console.log('coinID', sufficientCoin.coinObjectId)

      const serializedTx = await tx.serialize();
      await signAndExecuteTransaction({
        transaction: serializedTx,
      });

      alert("Press 'OK' to direct to your SUIET | SUI wallet");
    } catch (error: unknown) {
       if (error instanceof Error) {
          alert(`Minting Failed: ${error.message}`);
        } else {
          alert('Minting Failed: Unknown error occurred');
        }
          }
  }

  const unlockedStyles = [
    {
      id: '1',
      name: 'Super Ani',
      artist: 'Kim Jung Gi',
      thumbnail: '/images/output.png'
    },
    {
      id: '2',
      name: 'Digital Surrealism',
      artist: 'Emma Watson',
      thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80'
    }
  ];

  const handleGenerate = async () => {
    if (!prompt){
      alert("Please tell us what you prefer to!")
      return;
    } 
    if (!selectedStyle) {
      alert("Please choose an artist's style before generating");
      return;
    }
    

    setIsGenerating(true);

    try {
      const response = await axios.get('http://127.0.0.1:8000/', {
        params: {
          prompt,
          style: selectedStyle
        },
        responseType: 'blob'
      });

      const imageFile = response.data;
      const imageUrl = URL.createObjectURL(imageFile); // Temporary Blob URL

      const uploadedImageUrl = await uploadToIPFS(imageFile);
      if (!uploadedImageUrl) return;

      setCurrentSimpleGeneratedImage(uploadedImageUrl);

      setPromptHistory(prev => [{
        id: Date.now().toString(),
        name: nftName,
        timestamp: 'Just now',
        style: selectedStyle,
        image: imageUrl,
        imageIpfs: uploadedImageUrl,
        price: mintPrice
      }, ...prev]);


    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  console.log('currentSimpleGeneratedImage',currentSimpleGeneratedImage);
  console.log('currentChatGeneratedImage', currentChatGeneratedImage);



  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: prompt }]);
    setPrompt('');
    setIsChatGenerating(true);
    const userPrompt = prompt;
    try {
      const response = await axios.post('http://localhost:8001/chat/', {
        message: userPrompt
      }, {
        responseType: 'arraybuffer', // Handle both text and image responses
        headers: {
          'Accept': 'application/json, image/*' // Accept both JSON and image responses
        }
      });

      // Check if the response is an image (based on content-type header)
      const contentType = response.headers['content-type'];

      if (contentType.startsWith('image/')) {
        const blob = new Blob([response.data], { type: contentType });
        const imageUrl = URL.createObjectURL(blob);
        const uploadedImageUrl = await uploadToIPFS(blob);
        if (!uploadedImageUrl) return;
  
        setCurrentChatGeneratedImage(uploadedImageUrl); // Update to use chat mode state

        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: 'I\'ve generated an image based on your request:'
        }]);

        setChatPromptHistory(prev => [{
          id: Date.now().toString(),
          name: nftNameChat,
          timestamp: 'Just now',
          style: selectedStyle || 'Default',
          image: imageUrl,
          imageIpfs: uploadedImageUrl,
          price: mintPriceChat
        }, ...prev]);
      } else {
        // Handle text response
        // Convert arraybuffer to text if it's a JSON response
        const textDecoder = new TextDecoder('utf-8');
        const responseData = JSON.parse(textDecoder.decode(response.data));
        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: responseData.response
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.'
      }]);
    } finally {
      setIsChatGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900/50 to-black text-white pt-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setInterfaceMode('simple')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${interfaceMode === 'simple' ? 'bg-purple-600' : 'bg-gray-700'
              }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>Simple Mode</span>
          </button>
          <button
            onClick={() => setInterfaceMode('chat')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${interfaceMode === 'chat' ? 'bg-purple-600' : 'bg-gray-700'
              }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat Mode</span>
          </button>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-500">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Wand2 className="w-8 h-8 text-purple-400" />
                AI Studio
              </h2>
              {interfaceMode ==='simple' ? (
                <div className="mb-8">
                <div className='flex items-center border-t border-x border-gray-500  justify-between rounded-t-lg px-8 py-4 bg-gradient-to-r from-gray-950 to-gray-900'>
                  <div className='flex gap-3 items-center'>
                    <ALargeSmall className='h-8 w-8'/>
                    <p className="text-[18px] font-medium text-white">Enter name <span className='text-gray-400'>(this will later be saved as your NFT&apos;s name)</span></p>
                  </div>
                </div>
                <div className='border-b border-gray-500'></div>
                <div className=" rounded-b-lg border-b border-x border-gray-500">
                  <textarea
                    value={nftName}
                    onChange={(e) => {
                        setNftName(e.target.value);                   
                    }}
                    placeholder="Enter art name"
                    className="w-full min-h-12 bg-gray-900/50 pt-4 px-8 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              ) : (
                <div className="mb-8">
                <div className='flex items-center border-t border-x border-gray-500  justify-between rounded-t-lg px-8 py-4 bg-gradient-to-r from-gray-950 to-gray-900'>
                  <div className='flex gap-3 items-center'>
                    <ALargeSmall className='h-8 w-8'/>
                    <p className="text-[18px] font-medium text-white">Enter name <span className='text-gray-400'>(this will later be saved as your NFT&apos;s name)</span></p>
                  </div>
                </div>
                <div className='border-b border-gray-500'></div>
                <div className=" rounded-b-lg border-b border-x border-gray-500">
                  <textarea
                    value={nftNameChat}
                    onChange={(e) => {

                        setNftNameChat(e.target.value);
                      }
                    }
                    placeholder="Enter art name"
                    className="w-full min-h-12 bg-gray-900/50 pt-4 px-8 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              )
              }
              
              <div className="mb-8 bg-gray-900/50">
              <div className='py-4 px-8 flex gap-3 bg-gradient-to-r from-gray-950 to-gray-900 border-t border-x rounded-t-lg border-gray-500'>
                <Eclipse/>
                <p className="block text-[18px] font-medium text-white">Select Style</p>
              </div>
                <div className='border-b border-gray-500'></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-8 rounded-b-lg border-b border-x border-gray-500">
                  {unlockedStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => {setSelectedStyle(style.name)
                        setArtistName(style.artist)
                      } 
                      }
                      className={`relative rounded-lg overflow-hidden aspect-video group hover:scale-105 transition-all duration-300 ${
                        selectedStyle === style.name ? 'ring-2 ring-purple-500' : ''
                      }`}
                    >
                      <img
                        src={style.thumbnail}
                        alt={style.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center">
                          <p className="font-semibold text-[20px]">{style.name}</p>
                          <p className="font-semibold text-[16px] text-gray-400">{style.artist}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {interfaceMode === 'simple' ? (
                <div className="mb-8 ">
                <div className='flex items-center border-t border-x border-gray-500  justify-between rounded-t-lg px-8 py-4 bg-gradient-to-r from-gray-950 to-gray-900'>
                  <div className='flex gap-3 items-center'>
                    <SquareChevronRight/>
                    <p className="block text-[18px] font-medium text-white">Prompt</p>
                  </div>
                  
                  <div className="right-2 bottom-2">
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || isChatGenerating}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 disabled:cursor-not-allowed ${
                          isGenerating ? 'bg-purple-600/50' : 'bg-purple-600 hover:bg-purple-700'
                        } transition-all`}
                      >
                        {isGenerating && currentSimpleGeneratedImage === '' ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Generate
                          </>
                        )}
                    </button>
                  </div>
                </div>
                
                <div className='border-b border-gray-500'></div>
                <div className=" rounded-b-lg border-b border-x border-gray-500">
                  <textarea
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      setMintPrice(e.target.value.length * 10000000);
                    }}
                    placeholder="Describe the artwork you want to generate..."
                    className="w-full min-h-32 h-fit  bg-gray-900/50 pt-4 px-8 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              ) : (
                <div>
                  <div className='border-t border-x border-gray-500  justify-between rounded-t-lg px-8 py-4 bg-gradient-to-r from-gray-950 to-gray-900'>
                  <div className='flex gap-3 items-center'>
                    <SquareChevronRight/>
                    <p className="block text-[18px] font-medium text-white">Chat with our AI assistant</p>
                  </div>
                  </div>
                  <div className='border-b border-gray-500'></div>
                  <div className="mb-6 border-b border-x border-gray-500 rounded-b-lg">
                  <div className="bg-gray-900/50 rounded-lg p-4 h-[50vh] overflow-y-auto">
                    {chatHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                      >
                        <div
                          className={`
                            inline-block rounded-lg px-6 py-3 max-w-[90%]
                            ${message.role === 'user'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-800 border border-gray-700 text-gray-100'
                            }
                            prose prose-invert prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
                            ${message.role === 'assistant' ? 'prose-p:my-2 prose-code:text-purple-400 prose-code:bg-gray-900/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded' : ''}
                          `}
                          style={{
                            lineHeight: '1.6',
                            fontFamily: message.role === 'assistant' ? 'system-ui, -apple-system, sans-serif' : 'inherit'
                          }}
                        >
                          {message.role === 'assistant'
                            ? <div dangerouslySetInnerHTML={{
                              __html: marked(message.content, { breaks: true })
                            }} />
                            : message.content
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleChatSubmit} className="relative">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => {
                        if (!selectedStyle) {
                          alert("Please choose an artist's style before generating");
                          return;
                        }
                        setPrompt(e.target.value);
                        setMintPriceChat(e.target.value.length * 12000000);
                      }}
                      placeholder="Chat with AI assistant..."
                      className="w-full bg-gray-950/50 rounded-lg p-4 pr-24 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!prompt.trim() || isGenerating}
                      className="absolute right-2 top-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-center gap-2 disabled:cursor-not-allowed"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Send
                    </button>
                  </form>
                </div>
                </div>
                
              )
              }

              {interfaceMode === 'simple' ? (
                <div>
                  <div className='py-4 px-8 w-full border-t border-r border-l rounded-t-lg border-gray-500 bg-gradient-to-r from-gray-950 to-gray-900 text-[18px] font-medium text-white flex gap-3'>
                  <Brush/>
                  <p>Generated artwork</p>
                </div>
                <div className='border-b border-gray-500'></div>
                <div className="mb-8 aspect-square rounded-b-lg bg-gray-900/50 flex items-center justify-center border-b border-x border-gray-500">
                  {isGenerating ? (
                    <div className="text-center">
                      <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-400" />
                      <p className="text-gray-400">Creating your masterpiece...</p>
                    </div>
                  ) : currentSimpleGeneratedImage  ? (
                    <img src={currentSimpleGeneratedImage } alt="Generated Artwork" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Palette className="w-12 h-12 mx-auto mb-4" />
                      <p>Your generated artwork will appear here</p>
                    </div>
                  )}
                </div>
                </div>
                  
              ) : (
                <div className="aspect-square rounded-lg bg-gray-900/50 flex items-center justify-center mb-6 border border-gray-500">
                  {isChatGenerating ? (
                    <div className="text-center">
                      <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-400" />
                      <p className="text-gray-400">AI is working on your request...</p>
                    </div>
                  ) : currentChatGeneratedImage ? (
                    <div className="relative">
                      <img src={currentChatGeneratedImage} alt="Generated Artwork" className="w-full h-full object-cover rounded-lg" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-sm text-white">Generated image from our conversation</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                      <p>Ask me to generate an image and it will appear here</p>
                    </div>
                  )}
                </div>
              )}

              <div className='py-4 px-8 w-full border-t border-r border-l rounded-t-lg border-gray-500 bg-gradient-to-r from-gray-950 to-gray-900 text-[18px] font-medium text-white flex gap-3'>
                <Clock/>
                <p>Sale ends March 4, 2025 at 10:19 AM </p>
              </div>
              <div className='border-b border-gray-500'></div>

              <div className='flex flex-col border-b border-r border-l border-gray-500 p-8 rounded-b-lg bg-gray-900/50'>
                <p className='text-white/60'>NFT mint price</p>
                <div className='flex gap-2 items-end'>
                <p className='text-3xl font-semibold'>
                  {interfaceMode === 'simple' 
                    ? (isGenerating ? '0.0000' : (mintPrice / 1000000000).toFixed(4))
                    : (isChatGenerating ? '0.0000' : (mintPriceChat / 1000000000).toFixed(4))
                  } SUI
                </p>
                  {usdPrice !== null && (<p className='text-white/60'> ${interfaceMode === 'simple' ? (!isGenerating ? usdPrice.toFixed(2)  : '0.00')
                  : (!isChatGenerating ? usdPrice.toFixed(2)  : '0.00')} </p>)}
                </div>
                <div className="flex gap-4 items-center mt-2">
                  <div className='flex-1 items-center w-full'>
                    <div className='flex'>
                      <div className='bg-main_purple  rounded-s-lg '>
                        <p className='p-3 font-semibold'>SUI</p>
                      </div>
                      <input
                        onChange={(e) => setGasBudgetInSUI(parseFloat(e.target.value))}
                        placeholder='Enter your SUI budget'
                        className='w-full flex-1 px-4 py-3 bg-gray-700 disabled:bg-gray-800 rounded-e-lg focus:outline-none focus:ring-0 focus:border-none'>
                      </input>
                      
                    </div>
                  </div>
                  <div className='w-full flex flex-1 bg-main_purple hover:bg-purple-500 disabled:bg-main_purple/50 disabled:cursor-not-allowed rounded-lg transition-all  duration-200'>
                    <button   
                      onClick={handleMintNFT}
                      disabled={
                        !gasBudgetInSUI || 
                        
                        (interfaceMode === 'chat' ? gasBudgetInSUI < mintPriceChat/1000000000 ||  !currentChatGeneratedImage : gasBudgetInSUI < mintPrice/1000000000 ||  !currentSimpleGeneratedImage)
                      }
                      className="flex-[7] py-3 px-auto font-medium flex items-center justify-center disabled:cursor-not-allowed"
                    >
                      <p>Mint the art piece</p>
                    </button>
                    <div className='border-l'></div>
                    <button
                      onClick={handleMintNFT}
                      disabled={
                        !gasBudgetInSUI || 
                        gasBudgetInSUI < mintPrice/1000000000 || 
                        (interfaceMode === 'chat' ? !currentChatGeneratedImage : !currentSimpleGeneratedImage)
                      }                      
                      className="flex-[1] p-3 font-medium flex items-center justify-center disabled:cursor-not-allowed"
                    >
                      <Leaf/>
                    </button>
                  </div>
                </div>
                <div className='flex items-center gap-2 mt-4'>
                  <HandHeart className='text-green-500 h-7 w-7'/>
                  <p className='font-semibold text-[16px] text-white'>Support artist <span className='text-white/60'>Your creation supports the original artist with a royalty contribution.</span></p>
                </div>
              </div>
              
            </div>
          </div>
          {interfaceMode === 'simple' ? (
                      <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-500 h-fit max-h-[1200px] overflow-y-auto">
            
                      <div className="flex items-center justify-between mb-6">
                        <div className='flex items-center justify-between gap-2'>
                          <div className='flex gap-2 items-center'>
                            <History className="w-6 h-6 text-purple-400" />
                            <div className='flex items-end gap-2'>
                              <h3 className="text-xl font-semibold">
                                Prompt History
                                <span className='text-[14px] text-gray-400 ml-2 font-normal'>(Simple mode)</span>
                              </h3>
                            </div>
                          </div>
                          <button
                          onClick={handleClearHistory}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {promptHistory.map((item) => (
                          <button key={item.id} onClick={() => {
                          setNftName(item.name);
                          if (item.image) setCurrentSimpleGeneratedImage(item.imageIpfs);
                          if (item.price) setMintPrice(item.price);
                        }}
                          className={`w-full text-left ${currentSimpleGeneratedImage === item.imageIpfs ? 'ring-2 ring-main_purple rounded-lg' : ''}`}>
                            <div className="relative bg-gray-900/50 rounded-lg overflow-hidden">
                              {item.image && (
                                <img src={item.image} alt="Generated Artwork" className="w-full h-full object-cover" />
                              )}
                              <div className='absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-t from-black via-black/80 to-transparent'>
                                <div className='flex justify-end'>
                                  <p className='text-right font-semibold rounded-full border-purple-500 px-3 py-1 text-purple-500 bg-black/80'>{item.price/1000000000} SUI</p>
                                </div>
          
                                <div className='text-left'>
                                  <p className="text-[20px] mb-4 capitalize text-purple-500 font-bold">{item.name}</p>
          
                                  <div className=" flex items-center justify-between text-[14px] ">
                                  <div>
                                    <p>{item.style}</p>
                                    <span className='text-gray-400 text-[12px]'>{item.timestamp}</span>
                                  </div>
                                    <div className='p-2 rounded-full bg-main_purple/15 border border-main_purple'>
                                      <div className='h-3 w-3 rounded-full bg-main_purple'>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
          ) : (         
          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-500 h-fit max-h-[1200px] overflow-y-auto">  
            <div className="flex items-center justify-between mb-6">
              <div className='flex items-center gap-2'>
                <History className="w-6 h-6 text-purple-400" />
                <div className='flex items-end gap-2'>
                  <h3 className="text-xl font-semibold">
                    Prompt History
                    <span className='text-[14px] text-gray-400 ml-2 font-normal'>(Pro mode)</span>
                  </h3>
                </div>
                <button
                onClick={handleClearHistory}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {chatPromptHistory.map((item) => (
                <button key={item.id} onClick={() => {setNftNameChat(item.name);
                if (item.image) setCurrentChatGeneratedImage(item.imageIpfs);
                if (item.price) setMintPriceChat(item.price);}
                }
                className={`w-full text-left ${currentChatGeneratedImage === item.imageIpfs ? 'ring-2 ring-main_purple rounded-lg' : ''}`}>
                  <div key={item.id} className="relative bg-gray-900/50 rounded-lg overflow-hidden">
                    {item.image && (
                        <Image 
                        src={item.image}
                        alt="Generated Artwork"
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className='absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-t from-black via-black/80 to-transparent'>
                      <div className='flex justify-end'>
                        <p className='text-right font-semibold rounded-full border-purple-500 px-3 py-1 text-purple-500 bg-black/80'>{item.price/1000000000} SUI</p>
                      </div>  
                      <div className='text-left'>
                        <p className="text-[20px] mb-4 capitalize text-purple-500 font-bold">{item.name}</p>

                        <div className=" flex items-center justify-between text-[14px] ">
                        <div>
                          <p>{item.style}</p>
                          <span className='text-gray-400 text-[12px]'>{item.timestamp}</span>
                        </div>
                          <div className='p-2 rounded-full bg-main_purple/15 border border-main_purple'>
                            <div className='h-3 w-3 rounded-full bg-main_purple'>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
}