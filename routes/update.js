var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let {User,Code,Ping,Money,Hao,Pg} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');



router.get("/add_type/top_gonghao",function(req,res){
        User.find({}).then(function(val1){
                const p = val1.map(function(item){
                        return Hao.findOne({gonghao:item.gonghao}).then(function(val2){
                                User.update({gonghao:item.gonghao},{$set:{top_gonghao:val2.top_gonghao}},{multi:true},function(err){
                                        if(err) return err;
                                })
                        })
                })

                Promise.all(p).then(function(val3){
                        res.send("ok");
                })
        })
})


router.get('/top_gonghao_one_ss',function(req,res){
	Hao.find({z_gonghao:19890113}).then(function(rets){
		let p = rets.map(function(item){
			return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
				Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:19890113}},{multi:true},function(err){
					if(err){
						return err;
					}
				})

			})
		})

        Promise.all(p).then(function(val3){
                res.send("ok");
        })
	})
})

/*成为超级代理-更改一级*/
router.get('/top_gonghao_changer1',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
				Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
					if(err){
						return err;
					}
				})

			})
		})

        Promise.all(one).then(function(val1){
            console.log("挪动他的一级");
            return res.send("挪动他的一级");
        })

	})

})



/*成为超级代理-更改二级*/
router.get('/top_gonghao_changer2',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
						Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
							if(err){
								return err;
							}
						})

					})
				})
		        Promise.all(two).then(function(val1){
		        	 console.log("挪动他的二级");
		            return res.send("挪动他的二级");
		        })
			}
		});

	})

})



/*成为超级代理-更改三级*/
router.get('/top_gonghao_changer3',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(ret1){
		let one = ret1.map(function(item){
			return item.gonghao;
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
								Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
									if(err){
										return err;
									}
								})

							})
						})
				        Promise.all(three).then(function(val1){
				            console.log('我是第三级');
				            return res.send("我是第三级");
				        })
					}
				});
			}
		});

	})

})


/*成为超级代理-更改四级*/
router.get('/top_gonghao_changer4',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})



						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
										Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
											if(err){
												return err;
											}
										})

									})
								})
						        Promise.all(four).then(function(val1){
						        	console.log('我是第四级')
						            return res.send("我是第四级");
						        })
							}
						});





					}
				});
			}
		});

	})

})



/*成为超级代理-更改五级*/
router.get('/top_gonghao_changer5',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})

						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
												Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
													if(err){
														return err;
													}
												})

											})
										})
								        Promise.all(five).then(function(val1){
								        	console.log('我是第五级')
								            return res.send("我是第五级");
								        })
									}
								});

							}
						});

					}
				});
			}
		});

	})

})


/*成为超级代理-更改六级*/
router.get('/top_gonghao_changer6',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})



						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return item.gonghao
										})


										Hao.find({z_gonghao:{$in:five}},function(err,ret6){
											if(err){
												return logger.error(err);
											}else{

												let six = ret6.map(function(item){
													return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
														Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
															if(err){
																return err;
															}
														})

													})
												})
										        Promise.all(six).then(function(val1){
										        	console.log('我是第六级')
										            return res.send("我是第六级");
										        })
											}
										});

/*----------------------------------------------------------------------------*/

									}
								});

							}
						});

					}
				});
			}
		});

	})

})



/*成为超级代理-更改七级*/
router.get('/top_gonghao_changer7',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})



						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return item.gonghao
										})


										Hao.find({z_gonghao:{$in:five}},function(err,ret6){
											if(err){
												return logger.error(err);
											}else{

												let six = ret6.map(function(item){
													return item.gonghao
												})

												Hao.find({z_gonghao:{$in:six}},function(err,ret7){
													if(err){
														return logger.error(err);
													}else{

														let seven = ret7.map(function(item){
															return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
																Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
																	if(err){
																		return err;
																	}
																})

															})
														})
												        Promise.all(seven).then(function(val1){
												        	console.log('我是第七级')
												            return res.send("我是第七级");
												        })
													}
												});





/*----------------------------------------------------------------------------*/

											}
										});


									}
								});

							}
						});

					}
				});
			}
		});

	})

})


/*成为超级代理-更改八级*/
router.get('/top_gonghao_changer8',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})


						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return item.gonghao
										})


										Hao.find({z_gonghao:{$in:five}},function(err,ret6){
											if(err){
												return logger.error(err);
											}else{

												let six = ret6.map(function(item){
													return item.gonghao
												})

												Hao.find({z_gonghao:{$in:six}},function(err,ret7){
													if(err){
														return logger.error(err);
													}else{

														let seven = ret7.map(function(item){
															return item.gonghao
														})

														Hao.find({z_gonghao:{$in:seven}},function(err,ret8){
															if(err){
																return logger.error(err);
															}else{

																let eight = ret8.map(function(item){
																	return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
																		Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
																			if(err){
																				return err;
																			}
																		})

																	})
																})
														        Promise.all(eight).then(function(val1){
														        	console.log('我是第八级')
														            return res.send("我是第八级");
														        })
															}
														});

/*----------------------------------------------------------------------------*/

													}
												});


											}
										});


									}
								});

							}
						});

					}
				});
			}
		});

	})

})



/*成为超级代理-更改九级*/
router.get('/top_gonghao_changer9',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})


						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return item.gonghao
										})


										Hao.find({z_gonghao:{$in:five}},function(err,ret6){
											if(err){
												return logger.error(err);
											}else{

												let six = ret6.map(function(item){
													return item.gonghao
												})

												Hao.find({z_gonghao:{$in:six}},function(err,ret7){
													if(err){
														return logger.error(err);
													}else{

														let seven = ret7.map(function(item){
															return item.gonghao
														})

														Hao.find({z_gonghao:{$in:seven}},function(err,ret8){
															if(err){
																return logger.error(err);
															}else{


																let eight = ret8.map(function(item){
																	return item.gonghao;
																})


																Hao.find({z_gonghao:{$in:eight}},function(err,ret9){
																	if(err){
																		return logger.error(err);
																	}else{

																		let nine = ret9.map(function(item){
																			return Hao.findOne({gonghao:item.gonghao}).then(function(vala){
																				Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
																					if(err){
																						return err;
																					}
																				})

																			})
																		})
																        Promise.all(nine).then(function(val1){
																        	console.log('我是第九级')
																            return res.send("我是第九级");
																        })
	
																	}
																})


															}
														});

/*----------------------------------------------------------------------------*/

													}
												});


											}
										});


									}
								});

							}
						});

					}
				});
			}
		});

	})

})



/*成为超级代理-更改十级*/
router.get('/top_gonghao_changer10',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})


						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return item.gonghao
										})


										Hao.find({z_gonghao:{$in:five}},function(err,ret6){
											if(err){
												return logger.error(err);
											}else{

												let six = ret6.map(function(item){
													return item.gonghao
												})

												Hao.find({z_gonghao:{$in:six}},function(err,ret7){
													if(err){
														return logger.error(err);
													}else{

														let seven = ret7.map(function(item){
															return item.gonghao
														})

														Hao.find({z_gonghao:{$in:seven}},function(err,ret8){
															if(err){
																return logger.error(err);
															}else{


																let eight = ret8.map(function(item){
																	return item.gonghao;
																})


																Hao.find({z_gonghao:{$in:eight}},function(err,ret9){
																	if(err){
																		return logger.error(err);
																	}else{


																		let nine = ret9.map(function(item){
																			return item.gonghao;
																		})

																		Hao.find({z_gonghao:{$in:nine}},function(err,ret10){
																			if(err){
																				return logger.error(err)
																			}else{
																				let ten = ret10.map(function(item){
																					return Hao.findOne({gonghao:item.gonghao}).then(function(vala){

						Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
							if(err) return err;
						})

																					})
																					
																				})
																		        Promise.all(ten).then(function(val1){
																		        	console.log('我是第十级')
																		            return res.send("我是第十级");
																		        })
																				
																			}
																		})


	
																	}
																})


															}
														});

/*----------------------------------------------------------------------------*/

													}
												});


											}
										});


									}
								});

							}
						});

					}
				});
			}
		});

	})

})



/*成为超级代理-更改十一级*/
router.get('/top_gonghao_changer11',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})


						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return item.gonghao
										})


										Hao.find({z_gonghao:{$in:five}},function(err,ret6){
											if(err){
												return logger.error(err);
											}else{

												let six = ret6.map(function(item){
													return item.gonghao
												})

												Hao.find({z_gonghao:{$in:six}},function(err,ret7){
													if(err){
														return logger.error(err);
													}else{

														let seven = ret7.map(function(item){
															return item.gonghao
														})

														Hao.find({z_gonghao:{$in:seven}},function(err,ret8){
															if(err){
																return logger.error(err);
															}else{


																let eight = ret8.map(function(item){
																	return item.gonghao;
																})


																Hao.find({z_gonghao:{$in:eight}},function(err,ret9){
																	if(err){
																		return logger.error(err);
																	}else{


																		let nine = ret9.map(function(item){
																			return item.gonghao;
																		})

																		Hao.find({z_gonghao:{$in:nine}},function(err,ret10){
																			if(err){
																				return logger.error(err)
																			}else{

																				let ten = ret10.map(function(item){
																					return item.gonghao;
																				})

																				Hao.find({z_gonghao:{$in:ten}},function(err,ret11){
																					if(err){
																						return logger.error(err);
																					}else{


																				let eleven = ret11.map(function(item){
																					return Hao.findOne({gonghao:item.gonghao}).then(function(vala){

						Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
							if(err) return err;
						})

																					})
																					
																				})
																		        Promise.all(eleven).then(function(val1){
																		        	console.log('我是第十一级')
																		            return res.send("我是第十一级");
																		        })

																						
																					}
																				})



																				
																			}
																		})


	
																	}
																})


															}
														});

/*----------------------------------------------------------------------------*/

													}
												});


											}
										});


									}
								});

							}
						});

					}
				});
			}
		});

	})

})


/*成为超级代理-更改十二级*/

router.get('/top_gonghao_changer12',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})


						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return item.gonghao
										})


										Hao.find({z_gonghao:{$in:five}},function(err,ret6){
											if(err){
												return logger.error(err);
											}else{

												let six = ret6.map(function(item){
													return item.gonghao
												})

												Hao.find({z_gonghao:{$in:six}},function(err,ret7){
													if(err){
														return logger.error(err);
													}else{

														let seven = ret7.map(function(item){
															return item.gonghao
														})

														Hao.find({z_gonghao:{$in:seven}},function(err,ret8){
															if(err){
																return logger.error(err);
															}else{


																let eight = ret8.map(function(item){
																	return item.gonghao;
																})


																Hao.find({z_gonghao:{$in:eight}},function(err,ret9){
																	if(err){
																		return logger.error(err);
																	}else{


																		let nine = ret9.map(function(item){
																			return item.gonghao;
																		})

																		Hao.find({z_gonghao:{$in:nine}},function(err,ret10){
																			if(err){
																				return logger.error(err)
																			}else{

																				let ten = ret10.map(function(item){
																					return item.gonghao;
																				})

																				Hao.find({z_gonghao:{$in:ten}},function(err,ret11){
																					if(err){
																						return logger.error(err);
																					}else{

																						let eleven = ret11.map(function(item){
																							return item.gonghao;
																						})

																						Hao.find({z_gonghao:{$in:eleven}},function(err,ret12){
																							if(err){
																								return logger.error(err);
																							}else{

																								let twl = ret12.map(function(item){
																									return Hao.findOne({gonghao:item.gonghao}).then(function(vala){

										Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
											if(err) return err;
										})

																									})
																									
																								})
																						        Promise.all(twl).then(function(val1){
																						        	console.log('我是第十二级')
																						            return res.send("我是第十二级");
																						        })

																								
																							}
																						})																					



																						
																					}
																				})



																				
																			}
																		})


	
																	}
																})


															}
														});

/*----------------------------------------------------------------------------*/

													}
												});


											}
										});


									}
								});

							}
						});

					}
				});
			}
		});

	})

})




/*成为超级代理-更改十三级*/

router.get('/top_gonghao_changer13',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})


						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return item.gonghao
										})


										Hao.find({z_gonghao:{$in:five}},function(err,ret6){
											if(err){
												return logger.error(err);
											}else{

												let six = ret6.map(function(item){
													return item.gonghao
												})

												Hao.find({z_gonghao:{$in:six}},function(err,ret7){
													if(err){
														return logger.error(err);
													}else{

														let seven = ret7.map(function(item){
															return item.gonghao
														})

														Hao.find({z_gonghao:{$in:seven}},function(err,ret8){
															if(err){
																return logger.error(err);
															}else{


																let eight = ret8.map(function(item){
																	return item.gonghao;
																})


																Hao.find({z_gonghao:{$in:eight}},function(err,ret9){
																	if(err){
																		return logger.error(err);
																	}else{


																		let nine = ret9.map(function(item){
																			return item.gonghao;
																		})

																		Hao.find({z_gonghao:{$in:nine}},function(err,ret10){
																			if(err){
																				return logger.error(err)
																			}else{

																				let ten = ret10.map(function(item){
																					return item.gonghao;
																				})

																				Hao.find({z_gonghao:{$in:ten}},function(err,ret11){
																					if(err){
																						return logger.error(err);
																					}else{

																						let eleven = ret11.map(function(item){
																							return item.gonghao;
																						})

																						Hao.find({z_gonghao:{$in:eleven}},function(err,ret12){
																							if(err){
																								return logger.error(err);
																							}else{


																								let twl=ret12.map(function(item){
																									return item.gonghao;
																								})

																								Hao.find({z_gonghao:{$in:twl}},function(err,ret13){
																									if(err){
																										return logger.error(err);
																									}else{


																										let thr = ret13.map(function(item){
																											return Hao.findOne({gonghao:item.gonghao}).then(function(vala){

												Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
													if(err) return err;
												})

																											})
																											
																										})
																								        Promise.all(thr).then(function(val1){
																								        	console.log('我是第十三级')
																								            return res.send("我是第十三级");
																								        })
																									
																									}
																								})


																								
																							}
																						})																					



																						
																					}
																				})



																				
																			}
																		})


	
																	}
																})


															}
														});

/*----------------------------------------------------------------------------*/

													}
												});


											}
										});


									}
								});

							}
						});

					}
				});
			}
		});

	})

})


/*成为超级代理-更改十四级*/

router.get('/top_gonghao_changer14',function(req,res){

	Hao.find({z_gonghao:85209735}).then(function(rets){
		let one = rets.map(function(item){
			return item.gonghao
		})

		Hao.find({z_gonghao:{$in:one}},function(err,ret2){
			if(err){
				return logger.error(err);
			}else{

				let two = ret2.map(function(item){
					return item.gonghao
				})

				Hao.find({z_gonghao:{$in:two}},function(err,ret3){
					if(err){
						return logger.error(err);
					}else{

						let three = ret3.map(function(item){
							return item.gonghao
						})


						Hao.find({z_gonghao:{$in:three}},function(err,ret4){
							if(err){
								return logger.error(err);
							}else{

								let four = ret4.map(function(item){
									return item.gonghao
								})


								Hao.find({z_gonghao:{$in:four}},function(err,ret5){
									if(err){
										return logger.error(err);
									}else{

										let five = ret5.map(function(item){
											return item.gonghao
										})


										Hao.find({z_gonghao:{$in:five}},function(err,ret6){
											if(err){
												return logger.error(err);
											}else{

												let six = ret6.map(function(item){
													return item.gonghao
												})

												Hao.find({z_gonghao:{$in:six}},function(err,ret7){
													if(err){
														return logger.error(err);
													}else{

														let seven = ret7.map(function(item){
															return item.gonghao
														})

														Hao.find({z_gonghao:{$in:seven}},function(err,ret8){
															if(err){
																return logger.error(err);
															}else{


																let eight = ret8.map(function(item){
																	return item.gonghao;
																})


																Hao.find({z_gonghao:{$in:eight}},function(err,ret9){
																	if(err){
																		return logger.error(err);
																	}else{


																		let nine = ret9.map(function(item){
																			return item.gonghao;
																		})

																		Hao.find({z_gonghao:{$in:nine}},function(err,ret10){
																			if(err){
																				return logger.error(err)
																			}else{

																				let ten = ret10.map(function(item){
																					return item.gonghao;
																				})

																				Hao.find({z_gonghao:{$in:ten}},function(err,ret11){
																					if(err){
																						return logger.error(err);
																					}else{

																						let eleven = ret11.map(function(item){
																							return item.gonghao;
																						})

																						Hao.find({z_gonghao:{$in:eleven}},function(err,ret12){
																							if(err){
																								return logger.error(err);
																							}else{


																								let twl=ret12.map(function(item){
																									return item.gonghao;
																								})

																								Hao.find({z_gonghao:{$in:twl}},function(err,ret13){
																									if(err){
																										return logger.error(err);
																									}else{

																										let thir13=ret13.map(function(item){
																											return item.gonghao;
																										})

																										Hao.find({z_gonghao:{$in:thir13}},function(err,ret14){
																											if(err){
																												return logger.error(err);
																											}else{


																												let for14 = ret14.map(function(item){
																													return Hao.findOne({gonghao:item.gonghao}).then(function(vala){

														Hao.update({gonghao:item.gonghao},{$set:{top_gonghao:85209735}},{multi:true},function(err){
															if(err) return err;
														})

																													})
																													
																												})
																										        Promise.all(for14).then(function(val1){
																										        	console.log('我是第十四级')
																										            return res.send("我是第十四级");
																										        })

																											
																											}
																										})

																									
																									}
																								})


																								
																							}
																						})																					



																						
																					}
																				})



																				
																			}
																		})


	
																	}
																})


															}
														});

/*----------------------------------------------------------------------------*/

													}
												});


											}
										});


									}
								});

							}
						});

					}
				});
			}
		});

	})

})












module.exports = router;