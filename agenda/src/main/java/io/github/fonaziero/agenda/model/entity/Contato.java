package io.github.fonaziero.agenda.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Contato {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length = 150, nullable = false)
	private String nome;
	
	@Column(length = 150, nullable = false)
	private String email;
	
	@Column
	private Boolean favorito;
	
	@Lob
	@Column
	private byte[] foto;
	
}
